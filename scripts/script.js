let basket = [];

function init() {
    renderDishesMenu();
    renderCardDishes();
    renderBasket();
    renderPayDialog();
    startClock();
}

function renderDishesMenu() {
    const dishesMenuRef = document.getElementById('main-content-wrapper');
    dishesMenuRef.innerHTML = setDishesMenu();
}

function renderCardDishes() {
    const dishesContentRef = document.getElementById('mainDishes');
    dishesContentRef.innerHTML = "";

    categories.forEach(({ id, key, icon, title }) => {
        dishesContentRef.innerHTML += setCategory(id, icon, title);
    });

    categories.forEach(({ id, key }) => {
        const container = document.getElementById(id);
        dishesLibrary[key].forEach(dish => {
            container.innerHTML += setMenuCard(dish);
        });
    });
}

function addToBasket(name, price) {
    const existingDish = basket.find(item => item.name === name);
    const button = document.getElementById(`btn-${name}`);

    if (existingDish) {
        existingDish.count++;
    } else {
        basket.push({ name, price, count: 1 });
    }

    button.innerText = 'Hinzugefügt';
    button.style.backgroundColor = 'rgb(117, 67, 1)';
    renderBasket();
}

function changeCount(name, amount) {
    const existingDish = basket.find(item => item.name === name);

    existingDish.count += amount;

    if (existingDish.count <= 0) {
        basket = basket.filter(item => item.name !== name);
        const button = document.getElementById(`btn-${name}`);
        button.innerText = 'Hinzufügen';
        button.style.backgroundColor = 'rgb(80, 53, 32)';
    }
    renderBasket();
}

function renderBasket() {
    const basketRef = document.getElementById('basket-content');
    basketRef.innerHTML = "";

    if (basket.length === 0) {
        basketRef.innerHTML = setEmptyBasket();
    } else {
        basket.forEach(item => {
            basketRef.innerHTML += setBasketCard(item);
        });
    }

    updatePrice();
    updateBasketIcon();
}

function updatePrice() {
    const subtotal = basket.reduce((sum, item) => sum + item.price * item.count, 0);
    const delivery = basket.length > 0 ? 4.99 : 0;
    const total = subtotal + delivery;
    const payButtons = document.querySelectorAll('.pay-button');

    document.querySelector('.subtotal p:last-child').innerHTML = `${subtotal.toFixed(2).replace('.', ',')} €`;
    document.querySelector('.delivery-costs p:last-child').innerHTML = `${delivery.toFixed(2).replace('.', ',')} €`;
    document.querySelector('.final-price p:last-child').innerHTML = `<strong>${total.toFixed(2).replace('.', ',')} €</strong>`;

    if (payButtons.length === 0) return;
    payButtons.forEach(button => {
        if (basket.length > 0) {
            button.innerText = `Jetzt Bezahlen (${total.toFixed(2).replace('.', ',')} €)`;
        } else {
            button.innerText = 'Jetzt Bezahlen';
        }
    });
}

function clearBasket() {
    basket.forEach(item => {
        const button = document.getElementById(`btn-${item.name}`);
        button.innerText = 'Hinzufügen';
        button.style.backgroundColor = 'rgb(80, 53, 32)';
    });
    basket = [];
    renderBasket();
}

function openDialog() {
    if (basket.length === 0) return;
    document.getElementById('pay-dialog').showModal();
}

function confirmPayment() {
    const timestamp = getOrderTimestamp();
    clearBasket();
    closeDialog();
    showConfirmation(timestamp);
}

function showConfirmation(timestamp) {
    const confirmDialog = document.getElementById('confirmation-dialog');
    const timestampRef = document.getElementById('order-timestamp');

    if (timestampRef) timestampRef.innerText = timestamp;

    confirmDialog.showModal();
    setTimeout(() => confirmDialog.close(), 5000);
}

function closeDialog() {
    document.getElementById('pay-dialog').close();
}

function renderPayDialog() {
    document.body.innerHTML += setPayDialog();
    document.body.innerHTML += setConfirmationDialog();
}

function toggleBasket() {
    const basketContent = document.getElementById('basket-collapse');
    basketContent.classList.toggle('basket-open');
}

function updateBasketIcon() {
    const counter = document.getElementById('basket-counter');
    const basketIcon = document.querySelector('.basket-icon-wrapper img');
    const totalCount = basket.reduce((sum, item) => sum + item.count, 0);

    if (totalCount > 0) {
        counter.classList.remove('d-none');
        counter.innerText = totalCount;
        basketIcon.style.filter = 'invert(60%) sepia(90%) saturate(500%) hue-rotate(0deg) brightness(110%)';
    } else {
        counter.classList.add('d-none');
        counter.innerText = 0;
        basketIcon.style.filter = 'invert(0)';
    }
}

function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('de-DE');
    const date = now.toLocaleDateString('de-DE');
    const clockRef = document.getElementById('current-time');
    if (clockRef) clockRef.innerHTML = `${date} <br> ${time}`;
}

function getOrderTimestamp() {
    const now = new Date();
    const date = now.toLocaleDateString('de-DE');
    const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    return `${date} um ${time} Uhr`;
}