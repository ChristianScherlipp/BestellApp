let basket = []; // Leeres Array das alle Gerichte im Warenkorb speichert

function init() {
    renderDishesMenu();  // Grundgerüst + Warenkorb-Hülle rendern
    renderCardDishes();  // Alle Gerichte-Karten rendern
    renderBasket();      // Warenkorb rendern (erstmal leer)
    renderPayDialog();   // Pay-Dialog und Confirmation-Dialog in den Body einfügen
    startClock();        // Uhr starten
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
    const button = document.getElementById(`btn-${name}`); // Greift auf den Hinzufügen-Button des Gerichts zu
    if (existingDish) {
        existingDish.count++; // Gericht bereits vorhanden → nur Zähler erhöhen
    } else {
        basket.push({ name, price, count: 1 }); // Gericht noch nicht vorhanden → neu ins Array hinzufügen mit Zähler 1
    }

    // Button Text ändern
    button.innerText = 'Hinzugefügt'; // Button Text auf "Hinzugefügt" ändern
    button.style.backgroundColor = 'rgb(117, 67, 1)'; // Hintergrundfarbe des Buttons ändern
    renderBasket(); // Warenkorb neu rendern damit die Änderung sichtbar wird
}

function changeCount(name, amount) {
    const existingDish = basket.find(item => item.name === name); // Sucht das Gericht im Warenkorb-Array

    existingDish.count += amount; // Erhöht oder verringert den Zähler um den übergebenen Wert (+1 oder -1)

    if (existingDish.count <= 0) {
        basket = basket.filter(item => item.name !== name); // Zähler ist 0 oder kleiner → Gericht komplett aus dem Array entfernen
        const button = document.getElementById(`btn-${name}`); // Greift auf den Hinzufügen-Button des Gerichts zu
        button.innerText = 'Hinzufügen'; // Button Text zurücksetzen
        button.style.backgroundColor = 'rgb(80, 53, 32)'; // ursprüngliche Farbe
    }
    renderBasket(); // Warenkorb neu rendern damit die Änderung sichtbar wird
}

function renderBasket() {
    const basketRef = document.getElementById('basket-content'); // Greift auf den Warenkorb-Container zu
    basketRef.innerHTML = ""; // Leert den Warenkorb damit nichts doppelt gerendert wird

    if (basket.length === 0) {
        basketRef.innerHTML = setEmptyBasket(); // Leerer Zustand anzeigen wenn keine Gerichte im Warenkorb
    } else {
        basket.forEach(item => {
            basketRef.innerHTML += setBasketCard(item); // Hängt eine Warenkorb-Karte für jedes Gericht an
        });
    }

    updatePrice(); // Preise nach dem Rendern aktualisieren
    updateBasketIcon(); // Warenkorb-Icon aktualisieren
}

function updatePrice() {
    const subtotal = basket.reduce((sum, item) => sum + item.price * item.count, 0);
                     //                                 ↑ aktueller Stand + Preis × Anzahl des Gerichts
                     //                            ↑ läuft durch jedes Gericht
                     //                                                           ↑ startet bei 0
    const delivery = basket.length > 0 ? 4.99 : 0; // Lieferkosten: 4,99€ wenn Warenkorb nicht leer, sonst 0
    const total = subtotal + delivery; // Gesamtpreis = Zwischensumme + Lieferkosten
    const payButtons = document.querySelectorAll('.pay-button'); // Greift auf alle Bezahlen-Buttons zu

    document.querySelector('.subtotal p:last-child').innerHTML = `${subtotal.toFixed(2).replace('.', ',')} €`; // Zwischensumme setzen
    document.querySelector('.delivery-costs p:last-child').innerHTML = `${delivery.toFixed(2).replace('.', ',')} €`; // Lieferkosten setzen
    document.querySelector('.final-price p:last-child').innerHTML = `<strong>${total.toFixed(2).replace('.', ',')} €</strong>`; // Gesamtpreis setzen

    if (payButtons.length === 0) return; // Abbrechen wenn keine Buttons gefunden wurden
    payButtons.forEach(button => {
        if (basket.length > 0) {
            button.innerText = `Jetzt Bezahlen (${total.toFixed(2).replace('.', ',')} €)`; // Preis in Button anzeigen
        } else {
            button.innerText = 'Jetzt Bezahlen'; // Button Text zurücksetzen wenn Warenkorb leer
        }
    });
}

function clearBasket() {
    basket.forEach(item => {
        const button = document.getElementById(`btn-${item.name}`); // Greift auf den Hinzufügen-Button des Gerichts zu
        button.innerText = 'Hinzufügen'; // Button Text zurücksetzen
        button.style.backgroundColor = 'rgb(80, 53, 32)'; // Hintergrundfarbe zurücksetzen
    });
    basket = []; // Array leeren
    renderBasket(); // Warenkorb neu rendern (jetzt leer)
}

function openDialog(){
    if (basket.length === 0) return; // Nichts tun wenn Warenkorb leer
    document.getElementById('pay-dialog').showModal(); // Dialog öffnen
}

function confirmPayment(){
    const timestamp = getOrderTimestamp(); // Aktuellen Zeitstempel holen
    clearBasket(); // Warenkorb leeren
    closeDialog(); // Dialog schließen
    showConfirmation(timestamp); // Bestätigungs-Dialog anzeigen
}

function showConfirmation(timestamp) {
    const confirmDialog = document.getElementById('confirmation-dialog'); // Greift auf den Bestätigungs-Dialog zu
    const timestampRef = document.getElementById('order-timestamp'); // Greift auf den Zeitstempel-Container zu

    if (timestampRef) timestampRef.innerText = timestamp; // Zeitstempel setzen wenn Element existiert

    confirmDialog.showModal(); // Dialog öffnen
    setTimeout(() => confirmDialog.close(), 5000); // Dialog nach 5 Sekunden automatisch schließen
}

function closeDialog(){
    document.getElementById('pay-dialog').close(); // Pay-Dialog schließen
}

function renderPayDialog() {
    document.body.innerHTML += setPayDialog(); // Pay-Dialog in den Body einfügen
    document.body.innerHTML += setConfirmationDialog(); // Bestätigungs-Dialog in den Body einfügen
}

function toggleBasket() {
    const basketContent = document.getElementById('basket-collapse'); // Greift auf den aufklappbaren Warenkorb-Bereich zu
    basketContent.classList.toggle('basket-open'); // Klasse hinzufügen oder entfernen
}

function updateBasketIcon() {
    const counter = document.getElementById('basket-counter'); // Greift auf den Zähler-Badge zu
    const basketIcon = document.querySelector('.basket-icon-wrapper img'); // Greift auf das Warenkorb-Icon zu
    const totalCount = basket.reduce((sum, item) => sum + item.count, 0); // Gesamtanzahl aller Gerichte berechnen

    if (totalCount > 0) {
        counter.classList.remove('d-none'); // Counter sichtbar
        counter.innerText = totalCount;     // Anzahl setzen
        basketIcon.style.filter = 'invert(60%) sepia(90%) saturate(500%) hue-rotate(0deg) brightness(110%)'; // Icon orange färben
    } else {
        counter.classList.add('d-none');    // Counter verstecken
        counter.innerText = 0;              // Zahl zurücksetzen
        basketIcon.style.filter = 'invert(0)'; // Icon zurück zu weiß
    }
}

function startClock() {
    updateClock(); // sofort einmal aufrufen damit keine Verzögerung entsteht
    setInterval(updateClock, 1000); // jede Sekunde aktualisieren
}

function updateClock() {
    const now = new Date(); // Aktuelles Datum und Uhrzeit holen
    const time = now.toLocaleTimeString('de-DE'); // Uhrzeit im deutschen Format z.B. 14:32:05
    const date = now.toLocaleDateString('de-DE'); // Datum im deutschen Format z.B. 23.06.2026
    const clockRef = document.getElementById('current-time'); // Greift auf den Uhrzeit-Container im Header zu
    if (clockRef) clockRef.innerHTML = `${date} <br> ${time}`; // Datum und Uhrzeit setzen wenn Element existiert
}

function getOrderTimestamp() {
    const now = new Date(); // Aktuelles Datum und Uhrzeit holen
    const date = now.toLocaleDateString('de-DE'); // Datum im deutschen Format
    const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); // Uhrzeit nur mit Stunden und Minuten
    return `${date} um ${time} Uhr`; // Zeitstempel als lesbaren String zurückgeben z.B. "23.06.2026 um 14:32 Uhr"
}