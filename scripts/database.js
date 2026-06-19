const categories = [
    { id: 'soups-stews',   key: 'soupe',       icon: 'soupDishes',   title: 'Suppen & Vorspeisen' },
    { id: 'course-dishes', key: 'courseDishes', icon: 'courseDishes', title: 'Hauptgericht'         },
    { id: 'side-dishes',   key: 'sideDishes',   icon: 'sideDishes2',  title: 'Beilagen'             },
    { id: 'desserts',      key: 'desserts',     icon: 'desserts',     title: 'Desserts'             },
];

const dishesLibrary = {
    soupe: [
    {
        image : "hamburgerLabskaus",
        name: "Hamburger Labskaus",
        price: 9.90,
        description: "Gepökeltes Rindfleisch, Rote Bete, Matjes, Spiegelei",
    },
    {
        image: "grünkohlsuppe",
        name: "Grünkohlsuppe",
        price: 7.50,
        description: "Mit Pinkel-Wurst und Kartoffeln",
    },
    {
        image: "linsensuppe-mit-spätzle",
        name: "Linsensuppe mit Spätzle",
        price: 6.90,
        description: "Schwäbisch-deftig, mit Essig-Einlage und Wiener",
    }
],

courseDishes: [
    {
        image: "rheinischer-sauerbraten",
        name: "Rheinischer Sauerbraten",
        price: 18.90,
        description: "Rindfleisch in Rosinensoße, Rotkohl, Kartoffelklöße",
    },
    {
        image: "berliner-eisbein",
        name: "Berliner Haxe",
        price: 17.50,
        description: "Gepökelte Schweinshaxe, Erbspüree, Sauerkraut",
    },
    {
        image: "königsbergerklopse",
        name: "Königsberger Klopse",
        price: 15.90,
        description: "Hackfleischbällchen in Kapernsauce, Kartoffeln",
    },
    {
        image: "thüringer-rostbratwurst",
        name: "Thüringer Rostbratwurst",
        price: 9.90,
        description: "Vom Grill, mit Senf, Sauerkraut und Brötchen",
    },
    {
        image: "himmel-und-ääd",
        name: "Himmel un Ääd",
        price: 14.50,
        description: "Blutwurst, Kartoffelpüree, gebratene Äpfel, Röstzwiebeln",
    },
    {
        image: "maultasche-in-brühe",
        name: "Maultaschen in Brühe",
        price: 13.90,
        description: "Gefüllt mit Hackfleisch & Spinat, hausgemachte Brühe",
    },
    {
        image: "grünkohl-mit-pinkel",
        name: "Grünkohl mit Pinkel",
        price: 16.50,
        description: "Geschmorter Grünkohl, Pinkel-Wurst, Kassler, Kartoffeln",
    },
    {
        image: "matjes-nach-hausfrauenart",
        name: "Matjes nach Hausfrauenart",
        price: 13.50,
        description: "Mit saurer Sahne, Äpfeln, Gurken und Zwiebeln",
    }
],

sideDishes: [
    {
        image: "kartoffelklöße",
        name: "Kartoffelklöße",
        price: 4.50,
        description: "Halb & halb, mit Butter und Semmelbröseln",
    },
    {
        image: "rotkohl",
        name: "Rotkohl",
        price: 3.50,
        description: "Mit Äpfeln und Lorbeer geschmort",
    },
    {
        image: "handkäse-mit-musik",
        name: "Handkäse mit Musik",
        price: 5.90,
        description: "Mit Essig-Öl-Zwiebel-Marinade und Brot",
    }
],

desserts: [
    {
        image: "rotegrütze",
        name: "Rote Grütze",
        price: 6.50,
        description: "Mit Vanillesoße – Himbeeren, Kirschen, Johannisbeeren",
    },
    {
        image: "berliner-pfannkuchen",
        name: "Berliner Pfannkuchen",
        price: 4.90,
        description: "Mit Himbeermarmelade und Puderzucker",
    },
    {
        image: "schwarzwälder-kirschtorte",
        name: "Schwarzwälder Kirschtorte",
        price: 6.90,
        description: "Sahne, Kirschen, Biskuit, Kirschwasser",
    }
]
};