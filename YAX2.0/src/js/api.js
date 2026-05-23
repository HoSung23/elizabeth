/**
 * API.JS
 * Cliente API centralizado
 */

function getAuthToken() {
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY) || '';
    } catch (e) {
        return '';
    }
}

function setAuthToken(token) {
    try {
        if (token) {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }
    } catch (e) {
        // Ignorar errores de localStorage
    }
}

async function apiFetch(path, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };
    
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }
    
    const res = await fetch(API_BASE + path, {
        ...options,
        headers
    });
    
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
        throw new Error(data.error || 'Error de conexión con el servidor');
    }
    
    return data;
}

async function restoreSession() {
    const token = getAuthToken();
    if (!token) return;
    
    try {
        const data = await apiFetch('/api/me');
        if (data.ok && data.user) {
            currentUser = data.user;
        }
    } catch (e) {
        setAuthToken('');
        currentUser = null;
    }
}

async function loadRegisteredSellers() {
    try {
        const data = await fetch(API_BASE + '/api/sellers/directory').then(r => r.json());
        registeredSellers = data.ok ? (data.sellers || []) : [];
    } catch (e) {
        registeredSellers = [];
    }
    updateVendorCountDisplay();
}
