// Função para filtrar os produtos conforme o texto digitado
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();  // Obtém o termo de pesquisa em minúsculas
    const products = document.querySelectorAll('.product');  // Seleciona todos os produtos

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();  // Obtém o nome do produto
        if (productName.includes(searchTerm)) {
            product.style.display = '';  // Exibe o produto
        } else {
            product.style.display = 'none';  // Esconde o produto
        }
    });
}
