const catalogButton = document.getElementById('catalog-button');
const catalog = document.getElementById('catalog');

catalogButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Останавливаем всплытие события
    catalog.classList.toggle('catalog-hidden');
    catalog.classList.toggle('catalog-visible');
});

// Закрываем каталог, если кликнули вне его
document.addEventListener('click', function(event) {
    if (catalog.classList.contains('catalog-visible') && !catalog.contains(event.target) && event.target !== catalogButton) {
        catalog.classList.remove('catalog-visible');
        catalog.classList.add('catalog-hidden');
    }
});


function search_animal() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('product-card');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item";
        }
    }
}
