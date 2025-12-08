class ItemPriceGenerator{
    constructor(){

    }

    pickRandom(minPrice, maxPrice){
        this.price = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
        
        return this.price;
    }

    makeRandomItemPrice(type){
        switch(type){
            case 'Coffee':
            case 'Juice':
            case 'Tea':
            case 'SoftDrinks':
                this.price = this.pickRandom(1000, 5000);
                break;

            case 'Cakes':
            case 'Cookies':
            case 'Pastries':
            case 'Bread':
            case 'Sandwiches':
                this.price = this.pickRandom(5000,10000);                     
                break;

            default:
                    
        }
        
        return this.price;
    }
}

export default ItemPriceGenerator;