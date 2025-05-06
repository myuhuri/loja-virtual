// Filtrar produtos conforme a pesquisa
function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (searchTerm === "") {
            product.style.display = ''; // Exibe todos os produtos se o campo estiver vazio
        } else {
            product.style.display = productName.includes(searchTerm) ? '' : 'none';
        }
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
        toggleButton.innerHTML = '<img src="https://img.icons8.com/ios-filled/24/000000/moon.png" alt="Modo Escuro">';
    } else {
        body.classList.remove("light-mode");
        toggleButton.innerHTML = '<img src="https://img.icons8.com/ios-filled/24/000000/sun.png" alt="Modo Claro">';
    }
}

toggleButton.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        toggleButton.innerHTML = '<img src="https://img.icons8.com/ios-filled/24/000000/moon.png" alt="Modo Escuro">';
        localStorage.setItem("tema", "claro");
    } else {
        toggleButton.innerHTML = '<img src="https://img.icons8.com/ios-filled/24/000000/sun.png" alt="Modo Claro">';
        localStorage.setItem("tema", "escuro");
    }
});

window.addEventListener("DOMContentLoaded", aplicarTemaSalvo);

// Login popup
const loginPopup = document.getElementById("loginPopup");
const loginBtn = document.getElementById("loginButton");
const closeBtn = document.getElementById("closePopup");

loginBtn.addEventListener("click", () => {
    loginPopup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    loginPopup.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === loginPopup) {
        loginPopup.style.display = "none";
    }
});

// Login funcional com saudação
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email && password && nome) {
        // Login bem-sucedido
        alert("Login realizado com sucesso!");
        loginPopup.style.display = "none";

        // Mostrar saudação com nome do usuário
        const greeting = document.getElementById("userGreeting");
        greeting.textContent = `Bem-vindo, ${nome}`;
        greeting.style.display = "inline-block";

        // Ocultar botão de login e exibir logout
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "inline-block";

        // Salvar dados do usuário no localStorage
        const usuarioLogado = { nome, email };
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Mostrar saudação se o usuário estiver logado
window.addEventListener("DOMContentLoaded", () => {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioLogado"));
    const greeting = document.getElementById("userGreeting");
    
    if (usuarioSalvo) {
        // Exibir saudação personalizada
        greeting.textContent = `Bem-vindo, ${usuarioSalvo.nome}`;
        greeting.style.display = "inline-block";

        // Ocultar o botão de login e exibir o de logout
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "inline-block";
    } else {
        // Caso o usuário não esteja logado, exibir o botão de login
        greeting.style.display = "none";
        document.getElementById("loginButton").style.display = "inline-block";
        document.getElementById("logoutButton").style.display = "none";
    }
});

// Função de logout
document.getElementById("logoutButton").addEventListener("click", function () {
    // Limpar dados do usuário
    localStorage.removeItem("usuarioLogado");

    // Esconder saudação
    const greeting = document.getElementById("userGreeting");
    greeting.style.display = "none";

    // Exibir o botão de login novamente e esconder o de logout
    document.getElementById("loginButton").style.display = "inline-block";
    document.getElementById("logoutButton").style.display = "none";

    alert("Você foi deslogado com sucesso!");
});
