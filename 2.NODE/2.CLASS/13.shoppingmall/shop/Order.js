class Order {
    constructor(user) {
        this.user = user;
        this.products = [];
        this.totalAmount = 0;
    }

    addProduct(product, quantity) {
        if (product.checkAvailability(quantity)) {
            /*
            객체 리터럴 단축 속성(shorthand property)
            {
                "product": product,
                "quantity": quantity
            }
            */
            this.products.push({ product, quantity });
            this.totalAmount += product.price * quantity;
        } else {
            console.log(`상품에 재고가 부족합니다. ${product.name} 을 주문하실수 없습니다.`);
        }
    }

    getOrderSummaryOLDJS() {
        const items = [];

        for (let i = 0; i < this.products.length; i++) {
            const { product, quantity } = this.products[i];

            items.push({
                name: product.name,
                quantity: quantity,
                price: product.price
            })
        }

        return {
            user: this.user.name,
            totalAmount: this.totalAmount,
            items: items
        }
    }

    getOrderSummary() {
        // 고차함수를 써서 반환하는.. 가장 Modern JS 스타일...

        return {
            // 내가 원하는걸 key, value로 반환할것임.
            user: this.user.name,
            totalAmount: this.totalAmount,

            //({product, quantity})의 뜻
            // 매개변수에서 미리 객체를 구조 분해
            /*
            this.products.map(item => {
                return {
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                }
            });
            */

            // 화살표 뒤에 블록을 소괄호로 감싼 이유
            //화살표 함수에서 중괄호를 객체 literal로 바로 리턴하려고 소괄호로 감싼 것
            //소괄호 ()가 있으면 자바스크립트는 { ... }를 블록이 아닌 표현식(객체 리터럴) 으로 해석
            items: this.products.map(({ product, quantity }) => ({
                name: product.name,
                quantity: quantity,
                price: product.price
            }))
        }
    }
}

module.exports = Order;