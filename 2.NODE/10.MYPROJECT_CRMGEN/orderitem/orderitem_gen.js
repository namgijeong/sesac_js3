import UuidGenerator from "../common/uuidgen.js";

class OrderItemGenerator{
    constructor(orderId, itemId){
        this.id = new UuidGenerator().getRandomUuid();
        this.orderId = orderId;
        this.itemId = itemId;
    }

    getRandomOrderItem(){
        this.orderItem = {
            Id: this.id,
            OrderId: this.orderId,
            ItemId: this.itemId,
        }

        return this.orderItem;
    }
}

export default OrderItemGenerator;