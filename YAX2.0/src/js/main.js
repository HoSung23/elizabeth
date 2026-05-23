/**
 * MAIN.JS
 * Punto de entrada e inicialización de la aplicación
 */

window.onload = async () => {
    initPageOnLoad();
    await restoreSession();
    await loadRegisteredSellers();
    renderProducts(products);
    refreshSuppliersView();
    updateAuthUI();
    updateCartUI();
    loadSellerOffersCatalog();
    showView('catalog');
};

// Event listener para responsive
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
});
