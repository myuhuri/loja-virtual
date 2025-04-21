// Filtrar produtos conforme a pesquisa
function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        product.style.display = productName.includes(searchTerm) ? '' : 'none';
    });
}

// Redirecionar para a página do carrinho
document.getElementById('cartButton').addEventListener('click', function () {
    window.location.href = 'carrinho.html';
});

// Alternar tema claro/escuro
const toggleButton = document.getElementById("toggle-mode");
const body = document.body;

function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
        body.classList.add("light-mode");
        toggleButton.textContent = "Modo Escuro";
    } else {
        body.classList.remove("light-mode");
        toggleButton.textContent = "Modo Claro";
    }
}

toggleButton.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        toggleButton.textContent = "Modo Escuro";
        localStorage.setItem("tema", "claro");
    } else {
        toggleButton.textContent = "Modo Claro";
        localStorage.setItem("tema", "escuro");
    }
});

// Aplicar tema salvo ao carregar a página
window.addEventListener("DOMContentLoaded", aplicarTemaSalvo);
