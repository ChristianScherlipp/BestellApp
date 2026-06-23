let basket = []; // Leeres Array das alle Gerichte im Warenkorb speichert

function init() {
    renderDishesMenu();  // Grundgerüst + Warenkorb-Hülle rendern
    renderCardDishes();  // Alle Gerichte-Karten rendern
    renderBasket();      // Warenkorb rendern (erstmal leer)
    renderPayDialog();
}

function renderDishesMenu() {
    const dishesMenuRef = document.getElementById('main-content-wrapper'); // Greift auf den Haupt-Container im HTML zu
    dishesMenuRef.innerHTML = setDishesMenu(); // Setzt das Grundgerüst (Menü-Bereich + Warenkorb-Hülle) rein
}

function renderCardDishes() {
    const dishesContentRef = document.getElementById('mainDishes'); // Greift auf den Menü-Bereich zu
    dishesContentRef.innerHTML = ""; // Leert den Bereich damit nichts doppelt gerendert wird

    // 1. Schleife: Baut alle Kategorie-Gerüste auf (Überschrift + leerer Container)
    categories.forEach(({ id, key, icon, title }) => {
        dishesContentRef.innerHTML += setCategory(id, icon, title);
    });

    // 2. Schleife: Füllt jeden Kategorie-Container mit den jeweiligen Gerichtekarten
    categories.forEach(({ id, key }) => {
        const container = document.getElementById(id); // Greift auf den jeweiligen Kategorie-Container zu
        dishesLibrary[key].forEach(dish => {           // Geht jedes Gericht der Kategorie durch
            container.innerHTML += setMenuCard(dish);  // Hängt eine Gerichtekarte an den Container
        });
    });
}

function addToBasket(name, price) {
    const existingDish = basket.find(item => item.name === name); // Sucht ob das Gericht schon im Warenkorb ist
    const button = document.getElementById(`btn-${name}`);
    if (existingDish) {
        existingDish.count++; // Gericht bereits vorhanden → nur Zähler erhöhen
    } else {
        basket.push({ name, price, count: 1 }); // Gericht noch nicht vorhanden → neu ins Array hinzufügen mit Zähler 1
    }

    // Button Text ändern
    button.innerText = 'Hinzugefügt';
    button.style.backgroundColor = 'rgb(117, 67, 1)'; // grün
    renderBasket(); // Warenkorb neu rendern damit die Änderung sichtbar wird
}

function changeCount(name, amount) {
    const existingDish = basket.find(item => item.name === name); // Sucht das Gericht im Warenkorb-Array

    existingDish.count += amount; // Erhöht oder verringert den Zähler um den übergebenen Wert (+1 oder -1)

    if (existingDish.count <= 0) {
        basket = basket.filter(item => item.name !== name); // Zähler ist 0 oder kleiner → Gericht komplett aus dem Array entfernen
        // Button zurücksetzen
        const button = document.getElementById(`btn-${name}`);
        button.innerText = 'Hinzufügen';
        button.style.backgroundColor = 'rgb(80, 53, 32)'; // ursprüngliche Farbe
    }
    renderBasket(); // Warenkorb neu rendern damit die Änderung sichtbar wird
}

function renderBasket() {
    const basketRef = document.getElementById('basket-content'); // Greift auf den Warenkorb-Container zu
    basketRef.innerHTML = ""; // Leert den Warenkorb damit nichts doppelt gerendert wird

    if (basket.length === 0) {
        basketRef.innerHTML = setEmptyBasket(); // Leerer Zustand anzeigen
    } else {
        basket.forEach(item => {
            basketRef.innerHTML += setBasketCard(item);
        });
    }

    updatePrice(); // Preise nach dem Rendern aktualisieren
    updateBasketIcon();
}

function updatePrice() {
    // Berechnet die Zwischensumme: Preis × Anzahl für jedes Gericht, dann alle addieren
    const subtotal = basket.reduce((sum, item) => sum + item.price * item.count, 0);
                     //                                 ↑ aktueller Stand + Preis × Anzahl des Gerichts
                     //                            ↑ läuft durch jedes Gericht
                     //                                                           ↑ startet bei 0
    const delivery = basket.length > 0 ? 4.99 : 0; // Lieferkosten: 4,99€ wenn Warenkorb nicht leer, sonst 0
    const total = subtotal + delivery; // Gesamtpreis = Zwischensumme + Lieferkosten
    const payButtons = document.querySelectorAll('.pay-button');
    // Schreibt die berechneten Preise in die jeweiligen HTML-Elemente
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
    // Alle Buttons zurücksetzen
    basket.forEach(item => {
        const button = document.getElementById(`btn-${item.name}`);
        button.innerText = 'Hinzufügen';
        button.style.backgroundColor = 'rgb(80, 53, 32)';
    });
    basket = []; // Array leeren
    renderBasket(); // Warenkorb neu rendern (jetzt leer)
}

function openDialog(){
    if (basket.length === 0) return; // Nichts tun wen Warenkorb leer 
    document.getElementById('pay-dialog').showModal(); // Dialog öffnen
}

function confirmPayment(){
    clearBasket(); // Warenkorb leeren
    closeDialog(); // Dialog schließen
}

function closeDialog(){
    document.getElementById('pay-dialog').close();
}

function renderPayDialog() {
    document.body.innerHTML += setPayDialog();
}

function toggleBasket() {
    const basketContent = document.getElementById('basket-collapse');
    basketContent.classList.toggle('basket-open'); // Klasse hinzufügen oder entfernen
}

function updateBasketIcon() {
    const counter = document.getElementById('basket-counter');
    const basketIcon = document.querySelector('.basket-icon-wrapper img');
    const totalCount = basket.reduce((sum, item) => sum + item.count, 0);

    if (totalCount > 0) {
        counter.classList.remove('d-none'); // Counter sichtbar
        counter.innerText = totalCount;     // Anzahl setzen
        basketIcon.style.filter = 'invert(60%) sepia(90%) saturate(500%) hue-rotate(0deg) brightness(110%)'; // orange
    } else {
        counter.classList.add('d-none');    // Counter verstecken
        counter.innerText = 0; // ← Zahl zurücksetzen
        basketIcon.style.filter = 'invert(0)'; // zurück zu weiß
    }
}