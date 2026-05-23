/**
 * CART.JS
 * Gestión del carrito de compras
 */

function addToCartFromSupplier(productId, price, supplierId, supplierName, event) {
    if (event) event.stopPropagation();
    
    if (!currentUser) {
        alert('Debes iniciar sesión para realizar compras.');
        showView('login');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    _addToCart(product, 1, price, supplierName, supplierId);

    // Feedback visual
    const btn = document.getElementById(`addsup-${productId}-${supplierId}`);
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Añadido';
        btn.classList.add('added');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-cart-plus"></i> Añadir';
            btn.classList.remove('added');
        }, 1500);
    }
}

function _addToCart(product, qty, price, supplierName, supplierId = null) {
    const cartKey = supplierId ? `${product.id}_${supplierId}` : `${product.id}_general`;
    const subtotal = price * qty;
    const existing = cart.find(i => i.cartKey === cartKey);
    
    if (existing) {
        existing.qty += qty;
        existing.subtotal += subtotal;
    } else {
        cart.push({
            ...product,
            qty,
            subtotal,
            price,
            supplierName,
            supplierId,
            cartKey
        });
    }
    
    updateCartUI();
}

function removeFromCart(cartKey) {
    cart = cart.filter(i => i.cartKey !== cartKey);
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((a, c) => a + c.qty, 0);
    const total = cart.reduce((a, c) => a + c.subtotal, 0);
    
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cartTotal').textContent = `Q${total.toFixed(2)}`;
    
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = `<div class="cart-empty">
            <i class="fas fa-shopping-basket"></i>
            <p>Tu carrito está vacío</p>
            <p style="font-size:12px;margin-top:6px;">Selecciona un producto y elige un proveedor</p>
        </div>`;
        return;
    }
    
    container.innerHTML = cart.map(i => `
        <div class="cart-item">
            <div class="cart-item-icon">${i.icon}</div>
            <div class="cart-item-info">
                <h5>${i.name}</h5>
                <span class="cart-item-supplier"><i class="fas fa-store"></i> ${i.supplierName}</span>
                <p>${i.qty} ${i.medida}${i.qty>1?'s':''} · Q${i.price.toFixed(2)} c/u · <strong>Q${i.subtotal.toFixed(2)}</strong></p>
            </div>
            <button class="cart-item-del" onclick="removeFromCart('${i.cartKey}')"><i class="fas fa-trash"></i></button>
        </div>`).join('');
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('hidden');
}

function closeCartOutside(e) {
    if (e.target.id === 'cartModal') toggleCart();
}

function clearCart() {
    cart = [];
    updateCartUI();
    const cartModal = document.getElementById('cartModal');
    if (cartModal && !cartModal.classList.contains('hidden')) {
        cartModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    if (!currentUser) {
        alert('Debes iniciar sesión para realizar una compra.');
        toggleCart();
        showView('login');
        return;
    }
    
    toggleCart();
    const total = cart.reduce((a, c) => a + c.subtotal, 0);
    document.getElementById('checkoutTotalDisplay').textContent = `Q${total.toFixed(2)}`;
    document.getElementById('checkoutSummaryList').innerHTML = cart.map(i => `
        <div class="summary-item">
            <span class="item-name">${i.icon} ${i.qty}× ${i.name}<br><small style="color:var(--emerald);font-size:10px;"><i class="fas fa-store"></i> ${i.supplierName}</small></span>
            <span class="item-amt">Q${i.subtotal.toFixed(2)}</span>
        </div>`).join('');
    
    showView('checkout');
}

function processPayment() {
    const name = document.getElementById('payCardName').value;
    const num = document.getElementById('payCardNum').value;
    const exp = document.getElementById('payCardExp').value;
    const cvv = document.getElementById('payCardCvv').value;
    
    if (!name || !num || !exp || !cvv) {
        alert('Por favor completa todos los datos de pago.');
        return;
    }
    
    const btn = document.getElementById('payBtn');
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Procesando…';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`¡PAGO EXITOSO! ✅\n\nGracias, ${currentUser.names}.\nTu pedido ha sido procesado.\nSe enviará confirmación a: ${currentUser.email}`);
        cart = [];
        updateCartUI();
        btn.innerHTML = '<i class="fas fa-shield-alt"></i> Procesar Pago';
        btn.disabled = false;
        showView('catalog');
    }, 2200);
}
