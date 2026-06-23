function setDishesMenu() {
    return `
        <section class="main-content" id="mainDishes">
            
        </section>
        <section class="basket-wrapper">
            <section class="basket-content-wrapper">
                <section class="basket-nav-button">
                    <button class="d-none basket-toggle" onclick="">
                        <img src="./asssets/icons/home.svg" alt="Pfeil">
                    </button>
                    <button class="d-none basket-toggle" onclick="">
                        <img src="./asssets/icons/person.svg" alt="Pfeil">
                    </button>
                    <button class="d-none basket-toggle" onclick="">
                        <img src="./asssets/icons/bestellAppLogo.svg" alt="Pfeil">
                    </button>
                    <button class=" d-none basket-toggle" onclick="toggleBasket()">
                        <section class="basket-icon-wrapper">
                            <img src="./asssets/icons/basket-empty.svg" alt="Warenkorb">
                            <span id="basket-counter" class="basket-counter d-none">0</span>
                        </section>
                    </button>
                </section>
                <section id="basket-collapse" class="basket-collapse">
                    <section class="basket">
                        <h2>Ihr Warenkorb</h2>
                        <section id="basket-content" class="basket-content">
                            
                        </section>
                        <section class="basket-buy">
                            <div class="subtotal">
                                <p>Zwischensumm:</p>
                                <p>Price €</p>
                            </div>
                            <div class="delivery-costs">
                                <p>Liferkosten:</p>
                                <p>fix price €</p>
                            </div>
                            <hr>
                            <div class="final-price">
                                <p><strong>Total</strong>:</p>
                                <p>fixPrice + Price €</p>
                            </div>
                        </section>
                    </section>
                    <button class="pay-button" onclick="openDialog()">Jetzt Bezahlen</button>
                </section>
            </section>
        </section>`;
}

function setCategory(id, icon, title) {
    return `
    <section class="main-soups-stews-content dishes">
        <section class="main-headline">
            <img src="./asssets/icons/${icon}.svg" alt="${title} Logo">
            <h2>${title}</h2>
        </section>
        <section class="main-dishes" id="${id}">
        </section>
    </section>`;
}

function setMenuCard(dish) {
    return `
    <section class="main-dishes-card">
        <img src="./asssets/img/dishes/${dish.image}.webp" alt="${dish.name}">
        <section class="main-dishes-card-body">
            <div class="dishes-card-text">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
            </div>
            <div class="dishes-card-price-button">
                <p><strong>${dish.price.toFixed(2).replace('.', ',')} €</strong></p>
                <button id="btn-${dish.name}" onclick="addToBasket('${dish.name}', ${dish.price})">Hinzufügen</button>
            </div>
        </section>
    </section>
    `;
}

function setEmptyBasket() {
    return `
    <section class="basket-empty">
        <p>Hier gibt es noch nichts.</p>
        <p>Such dir ruhig etwas Leckeres aus!</p>
        <img src="./asssets/icons/basket-empty.svg" alt="Leerer Warenkorb">
    </section>`;
}

function setBasketCard(item) {
    return `
    <section class="main-basket-card-body">
        <div class="basket-card-text">
            <h3>1 x ${item.name}</h3>
        </div>
        <div class="basket-card-price-button">
            <div class="basket-card-price-button-counter">
                <button onclick="changeCount('${item.name}', -1)">-</button>
                <p>${item.count}</p>
                <button onclick="changeCount('${item.name}', 1)">+</button>
            </div>
            <p><strong>${(item.price * item.count).toFixed(2).replace('.', ',')} €</strong></p>
        </div>
    </section>
    `;
}

function setPayDialog() {
    return `
    <dialog id="pay-dialog">
        <section class="dialog-content">
            <h2>Bestellung bestätigen</h2>
            <img id="delivery-vehicle" src="./asssets/icons/delivery-vehicle.svg" alt="Bild eines LieferFahrzeugs">
            <p>Möchten sie Ihre Bestellung jetz bezahlen</p>
            <div class="dialog-buttons">
                <button onclick="confirmPayment()">Ja, bezahlen</button>
                <button onclick="closeDialog()">Abbrechen</button>
            </div>
        </section>
    </dialog>
    `;
}


