/**
 * UTILS.JS
 * Funciones auxiliares reutilizables
 */

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatCard(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.replace(/(.{4})/g, '$1  ').trim();
}

function disableSearchAutofill() {
    ['searchInput', 'supplierSearchInput'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('autocomplete', 'off');
        el.removeAttribute('readonly');
        if (el.value && (el.value.includes('@') || el.value.length > 80)) {
            el.value = '';
        }
    });
}

function initPageOnLoad() {
    disableSearchAutofill();
    if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
    }
    const search = document.getElementById('searchInput');
    if (search) {
        search.blur();
        search.setAttribute('autocomplete', 'off');
    }
    window.scrollTo(0, 0);
}

function getFilteredProducts() {
    const q = (document.getElementById('searchInput') || {}).value || '';
    return products.filter(p => {
        const matchCat = activeCategory === 'all' || p.cat === activeCategory;
        const matchQ = !q.trim() || 
                      p.name.toLowerCase().includes(q.trim().toLowerCase()) || 
                      p.desc.toLowerCase().includes(q.trim().toLowerCase());
        return matchCat && matchQ;
    });
}
