/**
 * CONFIG.JS
 * Configuración global y constantes de aplicación
 */

const API_BASE = window.location.origin;
const AUTH_TOKEN_KEY = 'yax_token';
const REGISTERED_SELLER_ID_OFFSET = 10000;

// Color y nombres de categorías
const catNames = {
    frutas: 'Frutas',
    verduras: 'Verduras',
    granos: 'Granos',
    proteinas: 'Carnes',
    tuberculos: 'Tubérculos',
    mariscos: 'Mariscos'
};

const sellerCatLabels = {
    frutas: 'Frutas',
    verduras: 'Verduras',
    granos: 'Granos',
    proteinas: 'Carnes / Proteínas',
    tuberculos: 'Tubérculos',
    mariscos: 'Mariscos y pescados',
    otros: 'Otros'
};

// Map de backgrounds por vista
const bgMap = {
    catalog: 'bg-catalog',
    suppliers: 'bg-catalog',
    login: 'bg-login',
    register: 'bg-register',
    checkout: 'bg-cart',
    about: 'bg-catalog',
    'seller-panel': 'bg-register'
};

// Estado global
let cart = [];
let currentUser = null;
let activeCategory = 'all';
let activeSupplierCert = 'all';
let expandedProductId = null;
let registeredSellers = [];
