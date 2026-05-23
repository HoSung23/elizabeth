/**
 * AUTH.JS
 * Gestión de autenticación
 */

function updateAuthUI() {
    const headerAuth = document.getElementById('headerAuthDesktop');
    const navAuth = document.getElementById('navAuth');
    const sellerNav = document.getElementById('nav-seller-panel');

    if (currentUser) {
        const role = currentUser.role === 'seller' ? 'Vendedor' : 'Comprador';
        
        if (headerAuth) {
            headerAuth.innerHTML = `
                <span class="header-user-name">Hola, ${currentUser.names}</span>
                <a class="link-logout" onclick="logout()">Salir</a>`;
        }
        
        if (navAuth) {
            navAuth.innerHTML = `
                <div class="auth-user nav-auth-mobile-only">
                    <strong>Hola, ${currentUser.names}</strong>
                    <span>${role}</span>
                </div>
                ${currentUser.role === 'seller' ? '<a class="auth-link nav-auth-mobile-only" onclick="showView(\'seller-panel\')"><i class="fas fa-store"></i> Mis Productos</a>' : ''}
                <a class="auth-link logout nav-auth-mobile-only" onclick="logout()">Cerrar sesión</a>`;
        }
        
        if (sellerNav) {
            sellerNav.classList.toggle('visible', currentUser.role === 'seller');
        }
    } else {
        const loginRegisterHtml = `
            <button type="button" class="auth-btn auth-btn-login" onclick="showView('login')">Ingresar</button>
            <button type="button" class="auth-btn auth-btn-register" onclick="showView('register')">Registrarse</button>`;
        
        if (headerAuth) {
            headerAuth.innerHTML = `
                <a class="link-login" onclick="showView('login')">Ingresar</a>
                <a class="link-register" onclick="showView('register')">Registrarse</a>`;
        }
        
        if (navAuth) navAuth.innerHTML = loginRegisterHtml;
        if (sellerNav) sellerNav.classList.remove('visible');
    }
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value;
    
    if (!email || !pass) {
        alert('Por favor completa todos los campos.');
        return;
    }

    const btn = document.querySelector('#view-login .btn-primary');
    const prevHtml = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Ingresando…';
    }

    const rememberMe = document.getElementById('loginRemember').checked;

    try {
        const data = await apiFetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password: pass, rememberMe })
        });
        
        currentUser = data.user;
        setAuthToken(data.token);
        updateAuthUI();
        
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPass').value = '';
        disableSearchAutofill();
        
        const searchEl = document.getElementById('searchInput');
        if (searchEl) {
            searchEl.value = '';
            searchEl.blur();
        }
        
        expandedProductId = null;
        loadSellerOffersCatalog();
        await loadRegisteredSellers();
        refreshSuppliersView();
        
        const roleLabel = currentUser.role === 'seller' ? 'Vendedor' : 'Comprador';
        const sessionNote = data.remember ? '\n\nSesión guardada por 30 días.' : '\n\nSesión activa por 24 horas.';
        
        if (currentUser.role === 'seller') {
            showView('seller-panel');
            alert(`¡Bienvenido, ${currentUser.names}!\n\nRol: ${roleLabel}${sessionNote}\n\nYa puedes publicar tus productos en el Panel de Vendedor.`);
        } else {
            showView('catalog');
            alert(`¡Bienvenido de vuelta, ${currentUser.names}!\n\nRol: ${roleLabel}${sessionNote}`);
        }
    } catch (e) {
        alert(e.message || 'No se pudo iniciar sesión. ¿Está el servidor encendido? Ejecuta: node server.js');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = prevHtml;
        }
    }
}

async function handleRegister() {
    const names = document.getElementById('regNames').value.trim();
    const lastNames = document.getElementById('regLastNames').value.trim();
    const business = document.getElementById('regBusiness').value.trim();
    const address = document.getElementById('regAddress').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const nit = document.getElementById('regNit').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value;
    const roleEl = document.querySelector('input[name="userRole"]:checked');
    const certEl = document.querySelector('input[name="certType"]:checked');
    const role = roleEl ? roleEl.value : 'buyer';
    const certType = certEl ? certEl.value : 'maga';

    if (!names || !lastNames || !email || !pass || !address || !phone) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }
    if (pass.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    const btn = document.querySelector('#view-register .btn-green');
    const prevHtml = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Registrando…';
    }

    try {
        await apiFetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                names,
                lastNames,
                business,
                address,
                phone,
                nit,
                email,
                password: pass,
                role,
                certType
            })
        });

        await loadRegisteredSellers();
        refreshSuppliersView();

        if (role === 'buyer') {
            alert(`¡Cuenta de Comprador creada!\n\nYa puedes iniciar sesión con:\n${email}\n\n📋 El equipo YA´x puede verificar tu información en un plazo de 48 horas hábiles. Mientras tanto puedes explorar el catálogo e iniciar sesión.`);
        } else if (certType === 'yax') {
            alert(`¡Registro de Vendedor guardado!\n\nYa apareces en el directorio de proveedores activos.\nInicia sesión con: ${email}\n\nAl ingresar accederás al Panel de Vendedor para publicar tus productos.`);
        } else {
            alert(`¡Registro de Vendedor guardado!\n\nYa sumas al contador de proveedores activos en YA´x.\nInicia sesión con: ${email}\n\nEn el Panel de Vendedor podrás subir productos con categoría, cantidad, precio y ubicación.`);
        }
        showView('login');
    } catch (e) {
        alert(e.message || 'No se pudo registrar. ¿Está el servidor encendido? Ejecuta: node server.js');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = prevHtml;
        }
    }
}

async function logout() {
    try {
        await apiFetch('/api/logout', { method: 'POST', body: '{}' });
    } catch (e) {
        // Ignorar errores
    }
    
    currentUser = null;
    expandedProductId = null;
    setAuthToken('');
    clearCart();
    closeMobileMenu();
    updateAuthUI();
    renderProducts(products);
    loadSellerOffersCatalog();
    showView('catalog');
}

// Role selector
function selectRole(role) {
    document.querySelectorAll('.role-card').forEach(c => {
        c.classList.remove('selected-buyer', 'selected-seller');
    });
    
    document.getElementById(`role-card-${role}`).classList.add(`selected-${role}`);
    document.getElementById(role === 'buyer' ? 'roleBuyer' : 'roleSeller').checked = true;

    if (role === 'buyer') {
        document.getElementById('buyer-verify-notice').classList.remove('hidden');
        document.getElementById('seller-cert-notice').classList.add('hidden');
        document.getElementById('maga-upload-section').classList.remove('hidden');
        document.getElementById('yax-payment-section').classList.add('hidden');
    } else {
        document.getElementById('buyer-verify-notice').classList.add('hidden');
        document.getElementById('seller-cert-notice').classList.remove('hidden');
    }
}

// Cert selector
function selectCert(type) {
    document.querySelectorAll('.cert-card').forEach(c => {
        c.classList.remove('selected-maga', 'selected-yax');
    });
    
    document.getElementById(`cert-card-${type}`).classList.add(`selected-${type}`);
    document.getElementById(type === 'maga' ? 'certMaga' : 'certYax').checked = true;
    
    if (type === 'yax') {
        document.getElementById('yax-cert-detail').classList.remove('hidden');
        document.getElementById('maga-cert-detail').classList.add('hidden');
        document.getElementById('maga-upload-section').classList.add('hidden');
        document.getElementById('yax-payment-section').classList.remove('hidden');
    } else {
        document.getElementById('yax-cert-detail').classList.add('hidden');
        document.getElementById('maga-cert-detail').classList.remove('hidden');
        document.getElementById('maga-upload-section').classList.remove('hidden');
        document.getElementById('yax-payment-section').classList.add('hidden');
    }
}

function showFiles(input) {
    const list = document.getElementById('fileList');
    list.innerHTML = '';
    Array.from(input.files).forEach(f => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `<i class="fas fa-file-alt"></i> ${f.name} <span style="margin-left:auto;font-size:10px;color:var(--emerald);">${(f.size/1024).toFixed(0)} KB</span>`;
        list.appendChild(div);
    });
}
