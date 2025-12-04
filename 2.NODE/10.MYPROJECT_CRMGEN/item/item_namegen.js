class ItemNameGenerator {
    constructor(){
        this.types = {
            "Coffee": [
                "Espresso",
                "Americano",
                "Latte",
                "Cappuccino",
                "Mocha",
                "Macchiato",
                "FlatWhite",
                "Cortado",
                "Affogato",
                "ColdBrew"
            ],
            "Juice": [
                "Orange",
                "Apple",
                "Grape",
                "Pineapple",
                "Mango",
                "Watermelon",
                "Lemon",
                "Grapefruit",
                "Kiwi",
                "Strawberry"
            ],
            "Tea": [
                "Black",
                "Green",
                "Oolong",
                "White",
                "EarlGrey",
                "Chamomile",
                "Peppermint",
                "Rooibos",
                "Jasmine",
                "Chai"
            ],
            "SoftDrinks": [
                "Cola",
                "LemonLime",
                "GingerAle",
                "RootBeer",
                "OrangeSoda",
                "GrapeSoda",
                "CreamSoda",
                "TonicWater",
                "ClubSoda",
                "EnergyDrink"
            ],
            "Cakes": [
                "Cheesecake",
                "Chocolate",
                "RedVelvet",
                "Tiramisu",
                "Carrot",
                "StrawberryShort",
                "BlackForest",
                "Lemon",
                "Matcha",
                "Vanillaponge"
            ],
            "Cookies": [
                "ChocolateChip",
                "OatmealRaisin",
                "PeanutButter",
                "Sugar",
                "MacadamiaNut",
                "Snickerdoodle",
                "DoubleChocolate",
                "Shortbread",
                "Gingerbread",
                "Butter"
            ],
            "Pastries": [
                "Croissant",
                "Danish",
                "Eclair",
                "CreamPuff",
                "AppleTurnover",
                "Strudel",
                "Palmier",
                "CinnamonRoll",
                "Tart",
                "Pie"
            ],
            "Bread": [
                "Baguette",
                "Sourdough",
                "Ciabatta",
                "Rye",
                "Whole Wheat",
                "Brioche",
                "Focaccia",
                "Bagel",
                "Pretzel",
                "Multigrain"
            ],
            "Sandwiches":[
                "Club",
                "BLT",
                "Ham&Cheese",
                "Tuna",
                "ChickenMayo",
                "Egg",
                "Turkey",
                "GrilledCheese",
                "Panini",
                "Baguette"
            ],
        };
    }

    pickRandomInArray(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    makeRandomItemName(type){
        const wantedType = arr[type];

        let itemFullName = '';
        let itemName = this.pickRandomInArray(wantedType); 
        itemFullName = `${itemName} ${type}`;

        return itemFullName;
    }
}
