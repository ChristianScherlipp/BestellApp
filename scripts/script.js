

function init() {
    renderDishesMenu();
    renderCardDishes();
    renderBasket();
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

function renderBasket() {
    const basketRef = document.getElementById('basket-content')
    basketRef.innerHTML = setBasketCard();
}