/**
 * SUPPLIERS.JS
 * Gestión de proveedores y directorio
 */

function mapRegisteredSellerToSupplier(s) {
    const cert = s.certType === 'yax' ? 'yax' : 'maga';
    const loc = [s.address, s.products?.[0]?.department].filter(Boolean).join(' · ') || s.address;
    return {
        id: REGISTERED_SELLER_ID_OFFSET + s.id,
        cert,
        name: s.displayName,
        location: loc,
        letter: s.letter,
        products: [],
        sellerProducts: s.products || [],
        isRegistered: true,
        userId: s.id,
        phone: s.phone,
    };
}

function getAllSuppliers() {
    const registered = registeredSellers.map(mapRegisteredSellerToSupplier);
    return [...suppliers, ...registered];
}

function updateVendorCountDisplay() {
    const total = suppliers.length + registeredSellers.length;
    const hero = document.getElementById('heroVendorCount');
    const text = document.getElementById('suppliersCountText');
    
    if (hero) hero.textContent = total;
    if (text) {
        const regNote = registeredSellers.length > 0
            ? ` (incluye ${registeredSellers.length} vendedor${registeredSellers.length !== 1 ? 'es' : ''} registrado${registeredSellers.length !== 1 ? 's' : ''} en YA´x)`
            : '';
        text.textContent = `${total} proveedores certificados activos${regNote} · Certificación YA´x Premium y Certificación MAGA`;
    }
}

function findSupplierById(supplierId) {
    return getAllSuppliers().find(x => x.id === supplierId) || null;
}

function renderSuppliers(data) {
    const container = document.getElementById('suppliersList');
    if (!container) return;
    
    if (data.length === 0) {
        container.innerHTML = '<div class="seller-empty" style="grid-column:1/-1;"><p>No hay proveedores que coincidan con la búsqueda.</p></div>';
        return;
    }
    
    container.innerHTML = data.map(s => {
        const certLabel = s.cert === 'yax' ? '⭐ Certificación YA´x' : '🏛️ Certificación MAGA';
        const certClass = s.cert === 'yax' ? 'cert-yax' : 'cert-maga';
        const avClass = s.cert === 'yax' ? 'yax-av' : 'maga-av';
        const regBadge = s.isRegistered ? '<span class="supplier-cert-badge cert-maga" style="margin-left:6px;background:var(--mint-lt);color:var(--forest);">🆕 Registrado en YA´x</span>' : '';
        
        let prodNames = '';
        if (s.isRegistered && s.sellerProducts?.length) {
            prodNames = s.sellerProducts.slice(0, 3).map(p =>
                `<span class="supplier-prod-tag">📦 ${escapeHtml(p.name)}</span>`
            ).join('');
        } else {
            prodNames = (s.products || []).slice(0, 3).map(sp => {
                const p = products.find(x => x.id === sp.prodId);
                return p ? `<span class="supplier-prod-tag">${p.icon} ${p.name}</span>` : '';
            }).join('');
        }
        
        if (!prodNames && s.isRegistered) {
            prodNames = '<span class="supplier-prod-tag" style="opacity:.7;">Sin productos publicados aún</span>';
        }
        
        return `
        <div class="supplier-card" onclick="openSupplierModal(${s.id})">
            <div class="supplier-card-top">
                <div class="supplier-avatar ${avClass}">${s.letter}</div>
                <div>
                    <div class="supplier-name">${escapeHtml(s.name)}</div>
                    <div class="supplier-location"><i class="fas fa-map-marker-alt" style="margin-right:4px;font-size:10px;"></i>${escapeHtml(s.location)}</div>
                </div>
            </div>
            <span class="supplier-cert-badge ${certClass}">${certLabel}</span>${regBadge}
            <div class="supplier-products-preview">${prodNames}</div>
            <div class="view-more"><i class="fas fa-eye" style="margin-right:4px;"></i>Ver ${s.isRegistered ? 'perfil' : 'todos los productos'} →</div>
        </div>`;
    }).join('');
}

function refreshSuppliersView() {
    const q = document.getElementById('supplierSearchInput')?.value || '';
    filterSuppliers(q);
}

function filterSuppliers(q) {
    const cert = activeSupplierCert;
    let filtered = getAllSuppliers();
    
    if (cert !== 'all') {
        filtered = filtered.filter(s => s.cert === cert);
    }
    
    if (q) {
        filtered = filtered.filter(s =>
            s.name.toLowerCase().includes(q.toLowerCase()) ||
            s.location.toLowerCase().includes(q.toLowerCase())
        );
    }
    
    renderSuppliers(filtered);
}

function filterSuppliersCert(btn, cert) {
    document.querySelectorAll('#view-suppliers .cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSupplierCert = cert;
    filterSuppliers(document.getElementById('supplierSearchInput').value);
}

// Modal proveedor
function openSupplierModal(supplierId) {
    const s = findSupplierById(supplierId);
    if (!s) return;
    
    document.getElementById('modalSupplierTitle').textContent = s.name;
    const certLabel = s.cert === 'yax' ? '⭐ Certificación YA´x Premium' : '🏛️ Certificación MAGA';
    const certClass = s.cert === 'yax' ? 'cert-yax' : 'cert-maga';
    const avClass = s.cert === 'yax' ? 'yax-av' : 'maga-av';

    let priceRows = '';
    
    if (!currentUser) {
        priceRows = `<div class="no-session-overlay">
            <i class="fas fa-lock"></i>
            <h3>Inicia sesión para ver los precios</h3>
            <p>Las consultas de precios y compras requieren que estés registrado en YA´x.</p>
            <button onclick="closeSupplierModal();showView('login');" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
            &nbsp;
            <button onclick="closeSupplierModal();showView('register');" class="btn btn-green"><i class="fas fa-user-plus"></i> Registrarse</button>
        </div>`;
    } else if (s.isRegistered) {
        const list = s.sellerProducts || [];
        if (list.length === 0) {
            priceRows = `<div class="notice-box info" style="margin-top:12px;"><i class="fas fa-info-circle"></i><div>Este vendedor aún no ha publicado productos en su panel.</div></div>`;
        } else {
            priceRows = `<div class="modal-products-title"><i class="fas fa-tags"></i> Productos publicados por el vendedor</div>
            <div class="modal-product-list">` + list.map(p => `
                <div class="modal-product-row">
                    <div class="mprod-info">
                        <span class="mprod-icon">📦</span>
                        <div><div class="mprod-name">${escapeHtml(p.name)}</div><div class="mprod-unit">${p.quantity} ${escapeHtml(p.unit)} · ${escapeHtml(p.department)}</div></div>
                    </div>
                    <div class="mprod-prices">
                        <div class="mp-pill prim"><span class="mu">Precio</span><span class="ma">Q${Number(p.price).toFixed(2)}</span></div>
                    </div>
                </div>`).join('') + '</div>';
        }
        if (s.phone) {
            priceRows += `<div class="notice-box success" style="margin-top:14px;"><i class="fas fa-phone"></i><div>Contacto: <strong>${escapeHtml(s.phone)}</strong></div></div>`;
        }
    } else {
        priceRows = `<div class="modal-products-title"><i class="fas fa-tags"></i> Productos y Precios de este Proveedor</div>
        <div class="modal-product-list">` + s.products.map(sp => {
            const p = products.find(x => x.id === sp.prodId);
            if (!p) return '';
            return `<div class="modal-product-row">
                <div class="mprod-info">
                    <span class="mprod-icon">${p.icon}</span>
                    <div><div class="mprod-name">${p.name}</div><div class="mprod-unit">${p.presentacion}</div></div>
                </div>
                <div class="mprod-prices">
                    <div class="mp-pill prim"><span class="mu">Precio Proveedor</span><span class="ma">Q${sp.price.toFixed(2)}</span></div>
                    <div class="mp-pill"><span class="mu">Ref. MAGA Máx.</span><span class="ma">Q${p.precio1.toFixed(2)}</span></div>
                </div>
                <button class="modal-add-btn" onclick="addToCartFromSupplier(${p.id},${sp.price},${s.id},'${s.name.replace(/'/g,"\\'")}', event)">
                    <i class="fas fa-cart-plus"></i> Añadir
                </button>
            </div>`;
        }).join('') + '</div>';
    }

    document.getElementById('modalSupplierBody').innerHTML = `
        <div class="modal-supplier-info">
            <div class="modal-avatar ${avClass}">${s.letter}</div>
            <div class="modal-supplier-detail">
                <h4>${s.name}</h4>
                <p><i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${s.location}</p>
                <span class="supplier-cert-badge ${certClass}">${certLabel}</span>
            </div>
        </div>
        ${priceRows}`;
    
    document.getElementById('supplierModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeSupplierModal() {
    document.getElementById('supplierModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function closeModalOutside(e) {
    if (e.target.id === 'supplierModal') closeSupplierModal();
}
