import OrderAtGenerator from "./order_atgen.js";
import UuidGenerator from "../common/uuidgen.js";

class OrderGenerator{
    constructor(storeId, userId){
        this.id = new UuidGenerator().getRandomUuid();
        this.orderAt = new OrderAtGenerator().makeRandomAt();

        this.storeId = storeId;
        this.userId = userId;
    }

    getRandomOrder(){
        this.order = {
            Id: this.id,
            OrderAt: this.orderAt,
            StoreId: this.storeId,
            UserId: this.userId,
        }

        return this.order;
    }
}

export default OrderGenerator;