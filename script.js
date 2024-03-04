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
    prize = 0;
    constructor(name, amount, prize) {
        if (name) {
            this.name = name;
        }
        if (amount) {
            this.amount = amount;
        }
        if (prize) {
            this.prize = prize;
        }
    }
}
let basket = new Basket();
let products = [
    {
        name: 'CheeseBurrito',
        amount: 3,
        prize: 8.00
    },
    {
        name: 'SaladBurrito',
        amount: 4,
        prize: 3.00
    },
    {
        name: 'PorkBurrito',
        amount: 3,
        prize: 6.00
    },
]
function createBasket() {
    let inputName = document.getElementById('input-name');
    let inputAmount = document.getElementById('input-amount');
    let newProduct = new Product(inputName.value, inputAmount.value);
    basket.products.push(newProduct);
    //let basket = new Basket(new Product('SalsaBurrito', 3));
    //basket.products.push(new Product('CheeseBurrito', 5))
    //basket.products.push(new Product('SalsaBurrito', 3))
    //basket.products.push(new Product('SaladBurrito', 1))


    console.log(basket)
    clearBasket();
    loadBasket();
    //clearFormInputs()
}

function loadBasket() {
    let basketDiv = getHTMLElem('basket-div');
    let totalAmount = 0;
    basket.products.forEach(element => {
        let prizeSum = element.prize * element.amount;
        basketDiv.innerHTML +=/*html*/`
        <tr>
            <td>${element.name}</td>
            <td>${element.amount}</td>
           <td>${element.prize}</td>
            <td>${prizeSum}</td>
        </tr>
   
    `;
        totalAmount = totalAmount + prizeSum;

    });
    totalPrize(totalAmount);
}

function totalPrize(totalAmount) {
    let tableFooter = getHTMLElem('table-footer');
    tableFooter.innerHTML +=/*html*/`
    <tr>
        <th>Gesamt:</th>
        <td>${totalAmount}</td>
    </tr>
    <tr>
        <td colspan="3">Rabatt Optional.</td>
    </tr>
`;
}

function loadPreBuildBasket() {
    products.forEach((product) => {
        let newProduct = new Product(product.name, product.amount, product.prize);
        basket.products.push(newProduct)
    })
    loadBasket();
}

function clearFormInputs() {
    let inputName = getHTMLElem('input-name');
    let inputAmount = getHTMLElem('input-amount');
    inputAmount.value = '';
    inputName.value = '';
}

function clearBasket() {
    let basketDiv = getHTMLElem('basket-div');
    basketDiv.innerHTML = "";
}

function getHTMLElem(id) {
    let elem = document.getElementById(`${id}`);
    return elem;
}