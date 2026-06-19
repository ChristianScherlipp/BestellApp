function setDishesMenu() {
    return `
        <section class="main-content" id="mainDishes">
            
        </section>
        <section class="basket-wrapper">
            <section class="basket-content-wrapper">
                <section class="basket">
                    <h2>Ihr Warenkorb</h2>
                    <section class="basket-content">

                    </section>
                    <section class="basket-buy">
                        <div>
                            <p>Zwischensumm:</p>
                            <p></p>
                        </div>
                        <div>
                            <p>Liferkosten:</p>
                            <p></p>
                        </div>
                        <hr>
                        <div>
                            <p><strong>Total</strong>:</p>
                            <p></p>
                        </div>
                    </section>
                </section>
                <button>Jetzt Bezahlen</button>
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
    return`
    <section class="main-dishes-card">
        <img src="./asssets/img/bestellAppLogo2.webp" alt="">
        <section class="main-dishes-card-body">
            <div class="dishes-card-text">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
            </div>
            <div class="dishes-card-price-button">
                <p><strong>${dish.price.toFixed(2).replace('.', ',')} €</strong></p>
                <button>Hinzufügen</button>
            </div>
        </section>
    </section>
    `;
}
