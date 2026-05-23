/**
 * SELLER.JS
 * Gestión del panel de vendedor
 */

function clearSellerProductForm() {
    document.getElementById('spEditId').value = '';
    document.getElementById('spName').value = '';
    document.getElementById('spCategory').value = 'frutas';
    document.getElementById('spUnit').value = 'Quintal';
    document.getElementById('spQuantity').value = '';
    document.getElementById('spPrice').value = '';
    document.getElementById('spDescription').value = '';
    document.getElementById('spDepartment').value = '';
    document.getElementById('spMunicipality').value = '';
    document.getElementById('spLocationDetail').value = '';
    document.getElementById('sellerFormTitle').textContent = 'Publicar nuevo producto';
    document.getElementById('spSaveBtn').innerHTML = '<i class="fas fa-plus-circle"></i> Publicar producto';
    document.getElementById('spCancelBtn').classList.add('hidden');
}

function cancelEditSellerProduct() {
    clearSellerProductForm();
}

async function loadSellerProducts() {
    const list = document.getElementById('sellerProductsList');
    const countEl = document.getElementById('sellerProductsCount');
    const welcome = document.getElementById('sellerPanelWelcome');
    
    if (!currentUser) return;
    
    if (welcome) {
        welcome.textContent = `Hola ${currentUser.names}, publica tus productos con categoría, cantidad, precio y la ubicación donde te encuentras en Guatemala.`;
    }
    
    list.innerHTML = '<div class="seller-empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando…</p></div>';
    
    try {
        const data = await apiFetch('/api/seller/products');
        const items = data.products || [];
        countEl.textContent = `${items.length} producto${items.length !== 1 ? 's' : ''} en tu catálogo`;
        
        if (items.length === 0) {
            list.innerHTML = '<div class="seller-empty"><i class="fas fa-box-open"></i><p>Aún no has publicado productos.<br>Usa el formulario para agregar el primero.</p></div>';
            return;
        }
        
        list.innerHTML = items.map(p => `
            <div class="seller-product-card">
                <div class="spc-top">
                    <div class="spc-name">${escapeHtml(p.name)}</div>
                    <span class="spc-cat">${sellerCatLabels[p.category] || p.category}</span>
                </div>
                <div class="spc-meta">
                    <div><i class="fas fa-boxes"></i> ${p.quantity} ${escapeHtml(p.unit)} disponible(s)</div>
                    ${p.description ? `<div><i class="fas fa-align-left"></i> ${escapeHtml(p.description)}</div>` : ''}
                    <div><i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.department)}${p.municipality ? ', ' + escapeHtml(p.municipality) : ''}</div>
                    ${p.locationDetail ? `<div><i class="fas fa-location-dot"></i> ${escapeHtml(p.locationDetail)}</div>` : ''}
                </div>
                <div class="spc-price">Q${Number(p.price).toFixed(2)} <span style="font-size:12px;font-weight:600;color:var(--warm-400);">/ ${escapeHtml(p.unit)}</span></div>
                <div class="spc-actions">
                    <button class="btn btn-outline" onclick="editSellerProduct(${p.id})"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-outline" style="color:var(--red);border-color:#f5c6c2;" onclick="deleteSellerProduct(${p.id})"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>`).join('');
        
        loadSellerOffersCatalog();
    } catch (e) {
        list.innerHTML = `<div class="seller-empty"><i class="fas fa-exclamation-triangle"></i><p>${escapeHtml(e.message)}</p></div>`;
    }
}

async function saveSellerProduct() {
    const editId = document.getElementById('spEditId').value;
    const payload = {
        name: document.getElementById('spName').value.trim(),
        category: document.getElementById('spCategory').value,
        unit: document.getElementById('spUnit').value,
        quantity: parseFloat(document.getElementById('spQuantity').value),
        price: parseFloat(document.getElementById('spPrice').value),
        description: document.getElementById('spDescription').value.trim(),
        department: document.getElementById('spDepartment').value,
        municipality: document.getElementById('spMunicipality').value.trim(),
        locationDetail: document.getElementById('spLocationDetail').value.trim(),
    };
    
    if (!payload.name || !payload.department || !payload.unit) {
        alert('Completa nombre, categoría, unidad y departamento.');
        return;
    }
    
    const btn = document.getElementById('spSaveBtn');
    btn.disabled = true;
    
    try {
        if (editId) {
            await apiFetch(`/api/seller/products/${editId}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            alert('Producto actualizado correctamente.');
        } else {
            await apiFetch('/api/seller/products', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            alert('¡Producto publicado! Ya aparece en el catálogo de ofertas de vendedores.');
        }
        
        clearSellerProductForm();
        loadSellerProducts();
        await loadRegisteredSellers();
        refreshSuppliersView();
    } catch (e) {
        alert(e.message);
    } finally {
        btn.disabled = false;
    }
}

async function editSellerProduct(id) {
    try {
        const data = await apiFetch('/api/seller/products');
        const p = (data.products || []).find(x => x.id === id);
        if (!p) return alert('Producto no encontrado.');
        
        document.getElementById('spEditId').value = p.id;
        document.getElementById('spName').value = p.name;
        document.getElementById('spCategory').value = p.category;
        document.getElementById('spUnit').value = p.unit;
        document.getElementById('spQuantity').value = p.quantity;
        document.getElementById('spPrice').value = p.price;
        document.getElementById('spDescription').value = p.description || '';
        document.getElementById('spDepartment').value = p.department;
        document.getElementById('spMunicipality').value = p.municipality || '';
        document.getElementById('spLocationDetail').value = p.locationDetail || '';
        document.getElementById('sellerFormTitle').textContent = 'Editar producto';
        document.getElementById('spSaveBtn').innerHTML = '<i class="fas fa-save"></i> Guardar cambios';
        document.getElementById('spCancelBtn').classList.remove('hidden');
        window.scrollTo(0, 0);
    } catch (e) {
        alert(e.message);
    }
}

async function deleteSellerProduct(id) {
    if (!confirm('¿Eliminar este producto de tu catálogo?')) return;
    
    try {
        await apiFetch(`/api/seller/products/${id}`, { method: 'DELETE' });
        loadSellerProducts();
        await loadRegisteredSellers();
        refreshSuppliersView();
    } catch (e) {
        alert(e.message);
    }
}

async function loadSellerOffersCatalog() {
    const container = document.getElementById('sellerOffersCatalog');
    if (!container) return;
    
    try {
        const data = await fetch(API_BASE + '/api/products/seller').then(r => r.json());
        const items = data.products || [];
        
        if (items.length === 0) {
            container.innerHTML = '<div class="seller-empty" style="grid-column:1/-1;"><i class="fas fa-seedling"></i><p>Aún no hay ofertas de vendedores.<br>Los proveedores registrados pueden publicar desde su panel.</p></div>';
            return;
        }
        
        container.innerHTML = items.map(p => `
            <div class="seller-offer-card">
                <span class="spc-cat" style="margin-bottom:8px;display:inline-block;">${sellerCatLabels[p.category] || p.category}</span>
                <h4>${escapeHtml(p.name)}</h4>
                <div class="so-meta">
                    ${p.description ? `<div>${escapeHtml(p.description)}</div>` : ''}
                    <div><i class="fas fa-boxes"></i> ${p.quantity} ${escapeHtml(p.unit)}</div>
                    <div><i class="fas fa-map-marker-alt"></i> ${escapeHtml(p.department)}${p.municipality ? ', ' + escapeHtml(p.municipality) : ''}</div>
                    ${p.locationDetail ? `<div><i class="fas fa-location-dot"></i> ${escapeHtml(p.locationDetail)}</div>` : ''}
                    <div><i class="fas fa-store"></i> <strong>${escapeHtml(p.sellerName || 'Vendedor')}</strong></div>
                </div>
                <div class="so-price">Q${Number(p.price).toFixed(2)} <span style="font-size:11px;font-weight:600;color:var(--warm-400);">/ ${escapeHtml(p.unit)}</span></div>
            </div>`).join('');
    } catch (e) {
        container.innerHTML = '<div class="seller-empty" style="grid-column:1/-1;"><p>No se pudieron cargar las ofertas.</p></div>';
    }
}
