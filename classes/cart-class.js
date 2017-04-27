module.exports = class Cart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
        this.numberOfItems;
    }

    getTotalPrice() {
        var sum = 0;
        this.items.forEach(item => {
            sum += item.price;
        });
        return sum;
    }
}

// NOT FINISHED