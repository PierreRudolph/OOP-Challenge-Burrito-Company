class Basket {
    products = [];

    constructor(newProduct) {
        if (newProduct) {
            this.products.push(newProduct);
        }
    }


}

class Product {
    name = "";
    amount = 0;
    constructor(name, amount) {
        if (name) {
            this.name = name;
        }
        if (amount) {
            this.amount = amount;
        }
    }
}
let basket = new Basket();

function createBasket() {
    let inputName = document.getElementById('input-name');
    let inputAmount = document.getElementById('input-amount');
    //let basket = new Basket(new Product('SalsaBurrito', 3));
    basket.products.push(new Product('CheeseBurrito', 5))
    basket.products.push(new Product('SalsaBurrito', 3))
    basket.products.push(new Product('SaladBurrito', 1))


    console.log(basket)
    loadBasket();
}

function loadBasket() {



    let basketDiv = document.getElementById('basket-div');
    basket.products.forEach(element => {
        basketDiv.innerHTML +=/*html*/`
    <span>${element.name}</span>
    <span>${element.amount}</span>
    `;
    });
}