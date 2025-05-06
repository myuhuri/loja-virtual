// Filtrar produtos conforme a pesquisa
function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        product.style.display = searchTerm === "" || productName.includes(searchTerm) ? '' : 'none';
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

// Login com Firebase Auth
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email && password && nome) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem("usuarioNome", nome); // apenas nome
                loginPopup.style.display = "none";
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            localStorage.setItem("usuarioNome", nome);
                            loginPopup.style.display = "none";
                            alert("Conta criada com sucesso!");
                        })
                        .catch(err => alert("Erro ao cadastrar: " + err.message));
                } else {
                    alert("Erro no login: " + error.message);
                }
            });
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Detectar login/logout com Firebase Auth
firebase.auth().onAuthStateChanged((user) => {
    const greeting = document.getElementById("userGreeting");
    const loginBtn = document.getElementById("loginButton");
    const logoutBtn = document.getElementById("logoutButton");

    if (user) {
        const nome = localStorage.getItem("usuarioNome") || "Usuário";
        greeting.textContent = `Bem-vindo, ${nome}`;
        greeting.style.display = "inline-block";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        greeting.style.display = "none";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
});

// Logout Firebase
document.getElementById("logoutButton").addEventListener("click", function () {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem("usuarioNome");
            alert("Você foi deslogado com sucesso!");
        })
        .catch((error) => alert("Erro ao sair: " + error.message));
});
