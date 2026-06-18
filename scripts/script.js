function init() {
    renderDishesMenu();
}

function renderDishesMenu() {
    const dishesMenuRef = document.getElementById('main-content-wrapper');

    dishesMenuRef.innerHTML = setDishesMenu();
}