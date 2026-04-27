import { getAllProducts } from './assets/service/getAllProducts.js';
import { createProduct } from './assets/service/createProduct.js';
import { updateProduct } from './assets/service/updateProduct.js';
import { deleteProduct } from './assets/service/deleteProduct.js';

const changeThemeButton = document.getElementById('change-theme');
const productTableBody = document.getElementById('product-table-body');
const searchInput = document.getElementById('search-input');
const formProduct = document.getElementById('form-product');
const modalProduct = document.getElementById('modal-product');
const closeModalProduct = document.getElementById('close-modal-product');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const addProductButton = document.getElementById('add-product-button');
const modalTitle = document.querySelector('.modal-title');
const modalSubtitle = document.querySelector('.modal-subtitle');
const footerCount = document.getElementById('footer-count');

const statTotal = document.getElementById('stat-total');
const statCategories = document.getElementById('stat-categories');
const statAvg = document.getElementById('stat-avg');
const statBrands = document.getElementById('stat-brands');

let allProducts = [];
let editingProductId = null;

function applyTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? 'dark_mode' : 'sunny';
}

applyTheme();

changeThemeButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? 'dark_mode' : 'sunny';
});

function showToast(message, type = 'default') {
    const container = document.getElementById('toast-container');
    const icons = { success: 'check_circle', error: 'error', default: 'info' };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <span class="material-symbols-rounded">${icons[type] ?? icons.default}</span>
        <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.25s ease forwards';
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}

function updateStats(products) {
    const total = products.length;
    const categories = new Set(products.map(p => p.category)).size;
    const brands = new Set(products.map(p => p.brand)).size;
    const avg = total
        ? products.reduce((s, p) => s + Number(p.price), 0) / total
        : 0;

    statTotal.textContent = total;
    statCategories.textContent = categories;
    statBrands.textContent = brands;
    statAvg.textContent = `R$ ${avg.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function showSkeleton() {
    productTableBody.innerHTML = Array.from({ length: 5 }, () => `
        <tr>
            ${Array.from({ length: 7 }, () => `
                <td style="padding: 14px 16px;">
                    <div class="skeleton" style="width: ${60 + Math.random() * 40}%;"></div>
                </td>`).join('')}
        </tr>`).join('');
}

function renderProducts(products) {
    productTableBody.innerHTML = '';

    if (footerCount) {
        footerCount.textContent = products.length === allProducts.length
            ? `${products.length} Produto${products.length !== 1 ? 's' : ''}`
            : `Mostrando ${products.length} de ${allProducts.length} Produtos`;
    }

    if (!products.length) {
        productTableBody.innerHTML = `
            <tr><td colspan="7">
                <div class="empty-state">
                    <div class="material-symbols-rounded empty-icon">inventory_2</div>
                    <p class="empty-title">Nenhum produto encontrado</p>
                    <p class="empty-desc">Tente outro termo ou adicione um novo produto.</p>
                </div>
            </td></tr>`;
        return;
    }

    for (const prod of products) {
        const tr = document.createElement('tr');
        const date = prod.created_at
            ? new Date(prod.created_at).toLocaleDateString('pt-BR')
            : '—';
        const price = Number(prod.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

        tr.innerHTML = `
            <td><span class="td-id">#${prod.id}</span></td>
            <td><span class="td-name">${prod.name}</span></td>
            <td><span class="td-brand">${prod.brand}</span></td>
            <td><span class="td-category">${prod.category}</span></td>
            <td><span class="td-price">R$ ${price}</span></td>
            <td><span class="td-date">${date}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-action btn-edit">
                        <span class="material-symbols-rounded">edit</span>
                        Editar
                    </button>
                    <button class="btn-action btn-delete">
                        <span class="material-symbols-rounded">delete</span>
                        Excluir
                    </button>
                </div>
            </td>`;

        tr.querySelector('.btn-edit').addEventListener('click', () => openModal('edit', prod));
        tr.querySelector('.btn-delete').addEventListener('click', async () => {
            if (!confirm(`Excluir "${prod.name}"?`)) return;
            try {
                await deleteProduct(prod.id);
                showToast(`"${prod.name}" excluído com sucesso`, 'success');
                await loadProducts();
            } catch {
                showToast('Erro ao excluir produto', 'error');
            }
        });

        productTableBody.appendChild(tr);
    }
}

async function loadProducts() {
    showSkeleton();
    try {
        const res = await getAllProducts();
        allProducts = Array.isArray(res.dados) ? res.dados : [];
        updateStats(allProducts);
        renderProducts(allProducts);
    } catch {
        productTableBody.innerHTML = `
            <tr><td colspan="7">
                <div class="empty-state">
                    <div class="material-symbols-rounded empty-icon">wifi_off</div>
                    <p class="empty-title">Erro ao carregar produtos</p>
                    <p class="empty-desc">Verifique sua conexão e tente novamente.</p>
                </div>
            </td></tr>`;
    }
}

window.addEventListener('DOMContentLoaded', loadProducts);

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(value) ||
        p.brand.toLowerCase().includes(value) ||
        p.category.toLowerCase().includes(value)
    );
    renderProducts(filtered);
});

function openModal(mode = 'create', product = null) {
    editingProductId = null;
    formProduct.reset();

    if (mode === 'edit' && product) {
        editingProductId = product.id;
        modalTitle.textContent = 'Editar Produto';
        if (modalSubtitle) modalSubtitle.textContent = `Editando: ${product.name}`;
        formProduct.name.value = product.name;
        formProduct.brand.value = product.brand;
        formProduct.category.value = product.category;
        formProduct.price.value = product.price;
    } else {
        modalTitle.textContent = 'Novo Produto';
        if (modalSubtitle) modalSubtitle.textContent = 'Preencha os dados do produto abaixo';
    }

    modalProduct.classList.remove('hidden');
    setTimeout(() => {
        const input = document.getElementById('product-name');
        if (input) input.focus();
    }, 50);
}

function closeModal() {
    modalProduct.classList.add('hidden');
    formProduct.reset();
    editingProductId = null;
}

addProductButton.addEventListener('click', () => openModal('create'));
closeModalProduct.addEventListener('click', closeModal);
if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

modalProduct.querySelector('.modal-backdrop').addEventListener('mousedown', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

window.addEventListener('keydown', (e) => {
    if (!modalProduct.classList.contains('hidden') && e.key === 'Escape') closeModal();
});

formProduct.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = formProduct.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="material-symbols-rounded" style="animation: spin 0.8s linear infinite; display:inline-block">progress_activity</span> Salvando...`;

    const data = {
        name: formProduct.name.value,
        brand: formProduct.brand.value,
        category: formProduct.category.value,
        price: formProduct.price.value,
    };

    try {
        if (editingProductId) {
            await updateProduct(editingProductId, data);
            showToast('Produto atualizado com sucesso', 'success');
        } else {
            await createProduct(data);
            showToast('Produto criado com sucesso', 'success');
        }
        closeModal();
        await loadProducts();
    } catch {
        showToast(editingProductId ? 'Erro ao atualizar produto' : 'Erro ao criar produto', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);