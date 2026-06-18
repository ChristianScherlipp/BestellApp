function setDishesMenu() {
    return `
        <section class="main-content">
            <section class="main-soups-stews-content dishes">
                <section class="main-headline" id="headline-main1">
                    <img src="./asssets/icons/soupDishes.svg" alt="Bild von einem Vorspeise Logo" >
                    <h2>Suppen & Vorspeisen</h2>
                </section>
                <section class="main-dishes" id="soups-stews" value="soupe">
                    
                </section>
            </section>
            <section class="main-course-content dishes">
                <section class="main-headline" id="headline-main2">
                    <img src="./asssets/icons/courseDishes.svg" alt="Bild von einem Hauptspeise Logo">
                    <h2>Hauptgericht</h2>
                </section>
                <section class="main-dishes" id="course-dishes" value="courseDishes">
                    
                </section>
            </section>
            <section class="main-side-dishes-content dishes">
                <section class="main-headline" id="headline-main3">
                    <img src="./asssets/icons/sideDishes2.svg" alt="Bild von einem Beilage Logo">
                    <h2>Beilagen</h2>
                </section>
                <section class="main-dishes" id="side-dishes" value="sideDishes">
                    
                </section>
            </section>
            <section class="main-desserts-content dishes">
                <section class="main-headline" id="headline-main4">
                    <img src="./asssets/icons/desserts.svg" alt="Bild von einem Desserts Logo">
                    <h2>Desserts</h2>
                </section>
                <section class="main-dishes" id="desserts" value="desserts">
                    
                </section>
            </section>
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
            </Section>
        </section>`;
}