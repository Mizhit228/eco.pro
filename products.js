// Загружаем JSON-файл с товарами
fetch('/products.json')
    .then(response => response.json())
    .then(data => {
        window.productsData = data; // Сохраняем массив товаров глобально
        setupSearch();              // Настраиваем обработку поиска
    })
    .catch(error => console.error('Ошибка:', error));

// Функция настройки формы поиска
function setupSearch() {
    const searchInput = document.querySelector('#search-input');
    const productList = document.querySelector('#product-list');

    // Обработчик события изменения текста в форме поиска
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.trim().toLowerCase();
        const matchingProducts = filterProducts(searchQuery); // Поиск совпадающих товаров
        renderProductList(matchingProducts);                  // Отображение найденных товаров
    });
}

// Фильтрует товары по поисковому запросу
function filterProducts(query) {
    return window.productsData.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
}

// Рендерит список товаров
function renderProductList(products) {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = ''; // Очищаем старый контент

    if (!products.length) {
        productList.textContent = 'Ничего не найдено';
        return;
    }

    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <span>Название: ${product.name}, Цена: ${product.price} руб.</span>
            <br/>
            <small>Описание: ${product.description}</small>
        `;
        productList.appendChild(li);
    });
}