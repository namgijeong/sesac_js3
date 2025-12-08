import ItemTypeGenereator from "./itemtype_gen.js";

import ItemNameGenerator from "./itemname_gen.js";
import ItemPriceGenerator from "./itemprice_gen.js";

import UuidGenerator from "../common/uuidgen.js";

class ItemGenerator{
    constructor(){
        this.type = new ItemTypeGenereator().getRandomType();

        this.name = new ItemNameGenerator().makeRandomItemName(this.type);
        this.price = new ItemPriceGenerator().makeRandomItemPrice(this.type);

        this.uuid = new UuidGenerator().getRandomUuid();
    }

    getRandomItem(){
        this.item = {
            Id : this.uuid,
            Name: this.name,
            Type: this.type,
            UnitPrice : this.price,
        }

        return this.item;
    }

}

export default ItemGenerator;