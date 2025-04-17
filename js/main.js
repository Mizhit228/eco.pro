document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector("header").classList.toggle("open")
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".products-grid",);

    const showItemsOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", showItemsOnScroll);

    showItemsOnScroll();
});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".categories",);

    const showItemsOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add("show");
            }
        });
    };

    window.addEventListener("scroll", showItemsOnScroll);

    showItemsOnScroll();
});

let cart = [];

function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price, quantity: 1 });
    }

    animateAddToCart(event.target);

    animateCartButton();

    updateCart();
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity -= 1;

        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }

    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItems.innerHTML = '';

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Корзина пуста</li>';
        totalPriceElement.textContent = '0';
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');

        li.textContent = `${item.name} - ${item.price} ₽ x ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.className = 'remove-button';

        removeButton.onclick = () => removeFromCart(item.name);

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить';
        addButton.className = 'add-button';

        addButton.onclick = () => addToCart(item.name, item.price);

        li.appendChild(removeButton);
        li.appendChild(addButton);

        cartItems.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

if (cart.length === 0) {
    cartItems.innerHTML = '<li>Корзина пуста</li>';
}


function openCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeCart() {
    const modal = document.getElementById('cartModal');

    modal.classList.remove('show');

    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

window.onclick = function (event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    if (cart.length === 0) {
        alert("Корзина пуста! Добавьте товары перед оформлением заказа.");
        return;
    }

    alert(`Заказ оформлен на имя ${name}.\nАдрес доставки: ${address}\nСодержимое корзины:\n${JSON.stringify(cart)}`);

    clearCart();
    closeCart();
}

function animateAddToCart(button) {
    const productCard = button.closest('.product-card');

    const animationDiv = document.createElement('div');
    animationDiv.classList.add('animate-add-to-cart');

    document.body.appendChild(animationDiv);

    const rect = productCard.getBoundingClientRect();

    animationDiv.style.left = `${rect.left + rect.width / 2}px`;
    animationDiv.style.top = `${rect.top + rect.height / 2}px`;

    setTimeout(() => {
        animationDiv.style.transform = `translate(${window.innerWidth - rect.left - rect.width / 2}px, ${document.querySelector('.cart-button').getBoundingClientRect().top - (rect.top + rect.height / 2)}px) scale(0.5)`;
        animationDiv.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        animationDiv.remove();
    }, 600);
}

function animateCartButton() {
    const cartButton = document.querySelector('.cart-button');

    cartButton.classList.add('pulse');

    setTimeout(() => {
        cartButton.classList.remove('pulse');
    }, 600);
}

const reviewsContainer = document.querySelector('.reviews-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let scrollAmount = reviewsContainer.clientWidth / 2;
let currentScrollPosition = 0;

nextBtn.addEventListener('click', () => {
    const maxScrollLeft = reviewsContainer.scrollWidth - reviewsContainer.clientWidth;

    if (currentScrollPosition + scrollAmount <= maxScrollLeft) {
        currentScrollPosition += scrollAmount;
        reviewsContainer.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
    }
});

prevBtn.addEventListener('click', () => {
    if (currentScrollPosition - scrollAmount >= 0) {
        currentScrollPosition -= scrollAmount;
        reviewsContainer.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
    }
});

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const deliveryMethod = document.getElementById('delivery-method').value;
    const paymentMethod = document.getElementById('payment-method').value;

    document.getElementById('confirmation-message').style.display = 'block';

    document.getElementById('order-form').reset();
}

function toggleChatWindow() {
    const button = document.querySelector('.contact-button');
    const chatWindow = document.querySelector('.chat-window');

    button.classList.toggle('active');
    chatWindow.style.display = button.classList.contains('active') ? 'flex' : 'none';
}

function sendMessage() {
    const userMessage = document.getElementById('user-message').value;

    if (userMessage.trim() === '') {
        return; 
    }

    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sent');
    messageElement.innerText = userMessage;
    messagesContainer.appendChild(messageElement);

    document.getElementById('user-message').value = '';

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    setTimeout(() => {
        const responseElement = document.createElement('div');
        responseElement.classList.add('message', 'received');
        responseElement.innerText = 'Спасибо за ваше сообщение!';
        messagesContainer.appendChild(responseElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; 
    }, 1000);
}
