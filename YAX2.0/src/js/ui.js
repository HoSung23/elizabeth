/**
 * UI.JS
 * Funciones de renderizado y navegación
 * Depende de: config.js, utils.js, cart.js, auth.js
 */

// Navegación y vistas
function showView(name) {
    closeMobileMenu();
    
    if (name === 'seller-panel') {
        if (!currentUser || currentUser.role !== 'seller') {
            alert(currentUser ? 'Esta sección es solo para cuentas de vendedor.' : 'Inicia sesión como vendedor para acceder a tu panel.');
            showView(currentUser ? 'catalog' : 'login');
            return;
        }
        loadSellerProducts();
    }

    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    const viewEl = document.getElementById(`view-${name}`);
    if (viewEl) viewEl.classList.remove('hidden');

    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const nb = document.getElementById(`nav-${name}`);
    if (nb && nb.style.display !== 'none') nb.classList.add('active');

    const bg = document.getElementById('page-bg');
    bg.className = bgMap[name] || 'bg-catalog';

    window.scrollTo(0, 0);
}

// Menú móvil
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('mobileNavOverlay');
    const icon = document.getElementById('mobileMenuIcon');
    const open = nav && nav.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
}

function closeMobileMenu() {
    const nav = document.getElementById('mainNav');
    const overlay = document.getElementById('mobileNavOverlay');
    const icon = document.getElementById('mobileMenuIcon');
    if (nav) nav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (icon) icon.className = 'fas fa-bars';
}

function openCartFromMenu() {
    closeMobileMenu();
    toggleCart();
}

function onOverlayTap(e) {
    if (e.target === e.currentTarget) closeMobileMenu();
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
});

// Filtros catálogo
function filterCat(btn, cat) {
    document.querySelectorAll('#view-catalog .cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = cat;
    expandedProductId = null;
    handleSearch(document.getElementById('searchInput').value);
}

function filterCatByName(cat) {
    activeCategory = cat;
    document.querySelectorAll('#view-catalog .cat-btn').forEach(b => {
        b.classList.remove('active');
        if (b.textContent.includes(cat) || (cat === 'all' && b.textContent === 'Todos')) {
            b.classList.add('active');
        }
    });
    renderProducts(products.filter(p => p.cat === cat));
}

// Renderizado de productos
function renderProducts(data) {
    const list = document.getElementById('productList');
    if (!list) return;
    
    if (data.length === 0) {
        list.innerHTML = '<div style="padding:60px;text-align:center;color:var(--warm-400);"><i class="fas fa-search" style="font-size:32px;margin-bottom:12px;display:block;"></i><p>No se encontraron productos</p></div>';
        return;
    }
    
    list.innerHTML = data.map(p => {
        const suppliersForProduct = suppliers.filter(s => s.products.some(sp => sp.prodId === p.id));
        const supCount = suppliersForProduct.length;
        return `<div>
            <div class="product-row ${expandedProductId === p.id ? 'expanded' : ''}" onclick="toggleProductAccordion(${p.id})">
                <div class="prod-icon">${p.icon}</div>
                <div>
                    <div class="prod-name">${p.name}</div>
                    <div class="prod-desc">${p.desc}</div>
                    <span class="prod-cat cat-${p.cat}">${catNames[p.cat] || p.cat}</span>
                </div>
                <div class="price-box">
                    <div class="price-pill primary"><span class="unit">${p.presentacion}</span></div>
                </div>
                <div class="price-box">
                    <div class="price-pill primary"><span class="unit">Precio Máx.</span><span class="amount">Q${p.precio1.toFixed(2)}</span></div>
                    <div class="price-pill"><span class="unit">Precio Mín.</span><span class="amount">Q${p.precio2.toFixed(2)}</span></div>
                </div>
                <div style="display:flex;align-items:center;justify-content:center;">
                    <button class="see-suppliers-btn ${expandedProductId === p.id ? 'open' : ''}" title="${supCount} proveedor(es)">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="accordion-panel ${expandedProductId === p.id ? 'open' : ''}" id="accordion-${p.id}">
                ${buildSupplierPanel(p, suppliersForProduct)}
            </div>
        </div>`;
    }).join('');
}

function buildSupplierPanel(product, suppliersForProduct) {
    if (suppliersForProduct.length === 0) {
        return `<div class="accordion-title"><i class="fas fa-store"></i> Sin proveedores disponibles para este producto actualmente.</div>`;
    }

    if (!currentUser) {
        return `<div class="no-session-overlay" style="max-width:500px;margin:0 auto;">
            <i class="fas fa-lock"></i>
            <h3>Inicia sesión para ver proveedores</h3>
            <p>Encontramos <strong>${suppliersForProduct.length} proveedor(es)</strong> para <em>${product.name}</em>. Para ver sus precios y comprar, debes estar registrado.</p>
            <button onclick="closeAndLogin()" class="btn btn-primary" style="margin-right:8px;"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
            <button onclick="closeAndRegister()" class="btn btn-green"><i class="fas fa-user-plus"></i> Registrarse</button>
        </div>`;
    }

    const cards = suppliersForProduct.map(s => {
        const sp = s.products.find(x => x.prodId === product.id);
        const certLabel = s.cert === 'yax' ? '⭐ YA´x Premium' : '🏛️ MAGA';
        const certCls = s.cert === 'yax' ? 'cert-yax' : 'cert-maga';
        const diff = sp.price - product.precio1;
        const diffLabel = diff === 0 ? '' : diff > 0
            ? `<span style="color:var(--red);font-size:10px;">+Q${diff.toFixed(2)} vs ref.</span>`
            : `<span style="color:var(--emerald);font-size:10px;">Q${diff.toFixed(2)} vs ref.</span>`;
        return `<div class="supplier-option-card">
            <div class="soc-top">
                <div>
                    <div class="soc-name">${s.name}</div>
                    <div class="soc-location"><i class="fas fa-map-marker-alt" style="margin-right:3px;font-size:10px;"></i>${s.location}</div>
                </div>
                <span class="soc-cert-badge ${certCls}">${certLabel}</span>
            </div>
            <div class="soc-price-row">
                <div>
                    <div class="soc-price">Q${sp.price.toFixed(2)}</div>
                    <div class="soc-ref">por ${product.presentacion} ${diffLabel}</div>
                </div>
                <button class="btn-add-sup" id="addsup-${product.id}-${s.id}"
                    onclick="addToCartFromSupplier(${product.id}, ${sp.price}, ${s.id}, '${s.name.replace(/'/g,"\\'")}', event)">
                    <i class="fas fa-cart-plus"></i> Añadir
                </button>
            </div>
        </div>`;
    }).join('');

    return `<div class="accordion-title">
        <i class="fas fa-store"></i> ${suppliersForProduct.length} Proveedor(es) — ${product.name}
    </div>
    <div class="supplier-options-grid">${cards}</div>`;
}

function toggleProductAccordion(productId) {
    if (expandedProductId === productId) {
        expandedProductId = null;
    } else {
        expandedProductId = productId;
    }
    const filtered = getFilteredProducts();
    renderProducts(filtered);
}

function closeAndLogin() { expandedProductId = null; showView('login'); }
function closeAndRegister() { expandedProductId = null; showView('register'); }

// Búsqueda en catálogo
function handleSearch(q) {
    const resultsSection = document.getElementById('searchResultsSection');
    const mainTable = document.getElementById('mainProductTable');
    const trimmed = q.trim().toLowerCase();

    const filteredProds = products.filter(p =>
        (activeCategory === 'all' || p.cat === activeCategory) &&
        (!trimmed || p.name.toLowerCase().includes(trimmed) || p.desc.toLowerCase().includes(trimmed))
    );

    mainTable.classList.remove('hidden');
    renderProducts(filteredProds);

    if (!trimmed) {
        resultsSection.classList.add('hidden');
        return;
    }

    const matchedIds = new Set(filteredProds.map(p => p.id));
    const matchedSuppliers = getAllSuppliers().filter(s =>
        s.name.toLowerCase().includes(trimmed) ||
        s.location.toLowerCase().includes(trimmed) ||
        (s.products && s.products.some(sp => matchedIds.has(sp.prodId))) ||
        (s.sellerProducts && s.sellerProducts.some(p => p.name.toLowerCase().includes(trimmed)))
    );

    if (matchedSuppliers.length === 0) {
        resultsSection.classList.add('hidden');
        return;
    }

    resultsSection.classList.remove('hidden');

    if (!currentUser) {
        resultsSection.innerHTML = `
            <h3><i class="fas fa-store" style="color:var(--emerald);"></i> Proveedores para "${q}"</h3>
            <div class="no-session-overlay">
                <i class="fas fa-lock"></i>
                <h3>Inicia sesión para ver precios por proveedor</h3>
                <p>Encontramos <strong>${matchedSuppliers.length} proveedor(es)</strong> con este producto. Debes estar registrado para ver sus precios.</p>
                <button onclick="showView('login')" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
                &nbsp;
                <button onclick="showView('register')" class="btn btn-green"><i class="fas fa-user-plus"></i> Registrarse</button>
            </div>`;
        return;
    }

    resultsSection.innerHTML = `<h3><i class="fas fa-store" style="color:var(--emerald);"></i> Proveedores para "${q}" <span style="font-size:14px;color:var(--warm-400);font-family:'Plus Jakarta Sans',sans-serif;font-weight:400;">(${matchedSuppliers.length} encontrado${matchedSuppliers.length>1?'s':''})</span></h3>`
    + matchedSuppliers.map(s => {
        const certLabel = s.cert === 'yax' ? '⭐ YA´x' : '🏛️ MAGA';
        const certClass = s.cert === 'yax' ? 'cert-yax' : 'cert-maga';
        let priceRows = '';
        
        if (s.isRegistered) {
            const list = (s.sellerProducts || []).filter(p => p.name.toLowerCase().includes(trimmed)).slice(0, 5);
            const show = list.length ? list : (s.sellerProducts || []).slice(0, 3);
            priceRows = show.map(p => `<div class="sup-price-row">
                <div class="prod-info"><div class="pname">📦 ${escapeHtml(p.name)}</div><div class="punit">${p.quantity} ${escapeHtml(p.unit)}</div></div>
                <div class="price-tag">Q${Number(p.price).toFixed(2)}</div>
            </div>`).join('') || '<p style="font-size:12px;color:var(--warm-400);padding:8px 0;">Vendedor registrado — ver perfil para más detalles.</p>';
        } else {
            const relevantProds = (s.products || []).filter(sp => matchedIds.has(sp.prodId));
            const toShow = relevantProds.length > 0 ? relevantProds : (s.products || []).slice(0, 3);
            priceRows = toShow.map(sp => {
                const p = products.find(x => x.id === sp.prodId);
                if (!p) return '';
                return `<div class="sup-price-row">
                    <div class="prod-info"><div class="pname">${p.icon} ${p.name}</div><div class="punit">${p.presentacion}</div></div>
                    <div class="price-tag">Q${sp.price.toFixed(2)}</div>
                    <button class="add-btn-sup" onclick="addToCartFromSupplier(${p.id},${sp.price},${s.id},'${s.name.replace(/'/g,"\\'")}', event)"><i class="fas fa-cart-plus"></i> Añadir</button>
                </div>`;
            }).join('');
        }
        
        return `<div class="supplier-result-card">
            <div class="supplier-result-header">
                <div class="supplier-result-name">
                    <span style="width:38px;height:38px;border-radius:10px;background:${s.cert==='yax'?'var(--gold-lt)':'var(--mint-lt)'};display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-family:'Cormorant Garamond',serif;font-size:16px;color:${s.cert==='yax'?'var(--gold-dk)':'var(--forest)'};border:1px solid ${s.cert==='yax'?'#f0d08a':'var(--mint)'};">${s.letter}</span>
                    ${s.name}
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span class="supplier-cert-badge ${certClass}">${certLabel}</span>
                    <span style="font-size:11px;color:var(--warm-400);"><i class="fas fa-map-marker-alt"></i> ${s.location}</span>
                    <button onclick="openSupplierModal(${s.id})" style="background:none;border:1px solid var(--warm-100);border-radius:7px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;color:var(--forest-dk);">Ver perfil →</button>
                </div>
            </div>
            <div class="supplier-product-prices">${priceRows}</div>
        </div>`;
    }).join('');
}
