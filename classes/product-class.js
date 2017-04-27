module.exports = class Product {
    constructor(title, price, img, description, category, date) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.date = date;
    }
}