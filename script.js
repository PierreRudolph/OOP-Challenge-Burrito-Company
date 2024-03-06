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
    id = 0;
    constructor(name, amount, prize, id) {
        if (name) {
            this.name = name;
        }
        if (amount) {
            this.amount = amount;
        }
        if (prize) {
            this.prize = prize;
        }
        this.id = id ? id : '';
    }
}

let basket = new Basket();
let rabatt = 0;
let percent = false;
let products = [
    {
        name: 'Cheese Burrito',
        amount: 3,
        prize: 8.50,
        id: 1234
    },
    {
        name: 'Salad Burrito',
        amount: 4,
        prize: 3.50,
        id: 1345
    },
    {
        name: 'Pork Burrito',
        amount: 3,
        prize: 6.50,
        id: 1456
    },
]

function addProduct(id) {
    let newProduct = '';
    products.forEach((product) => {
        newProduct = (product.id == id) ? newProduct = product : newProduct;
    })
    console.log(newProduct)
    if (basket.products.length == 0) {
        basket.products.push(new Product(newProduct.name, 1, newProduct.prize, newProduct.id))
        console.log(basket.products)
        loadBasket();
        return
    }


    basket.products.forEach((product) => {
        if (newProduct.id == product.id) {
            console.log('amount called')
            product.amount = product.amount + 1;
        } else {
            console.log('push called')
            basket.products.push(new Product(newProduct.name, 1, newProduct.prize, newProduct.id))
        }
    })
    console.log(basket.products)
    loadBasket();
}

function createBasket() {
    clearTableBody();
    loadBasket();
}


function formatNumber(num) {
    const locals = 'de-De';
    const options = { style: 'currency', currency: 'EUR' };
    return new Intl.NumberFormat(locals, options).format(num);
}


function loadBasket() {
    let basketDiv = getHTMLElem('basket-div');
    clearTableBody();
    clearTableFooter();
    let totalAmount = 0;
    let rabattAmount = 0;
    let rabattPecent = 0;
    basket.products.forEach(element => {
        let prizeSum = element.prize * element.amount;
        basketDiv.innerHTML +=/*html*/`
        <tr>
            <td>${element.name}</td>
            <td>${element.amount}</td>
           <td>${formatNumber(element.prize)}</td>
           <td></td>
            <td>${formatNumber(prizeSum)}</td>
        </tr>

    `;
        totalAmount = totalAmount + prizeSum;
    });

    if (!percent && rabatt > 0) {
        rabattAmount = totalAmount - rabatt
    }
    if (percent && rabatt > 0) {
        rabattPecent = totalAmount * rabatt / 100;
        rabattAmount = totalAmount - rabattPecent;
    }
    innerHTMLTotalPrize(totalAmount, rabattAmount);
}


function innerHTMLTotalPrize(totalAmount, rabattAmount) {
    let tableFooter = getHTMLElem('table-footer');
    if (!percent) {
        rabattToString = formatNumber(rabatt);
    } else {
        rabattToString = rabatt + '%';
    }
    tableFooter.innerHTML +=/*html*/`
    <tr>
        <th>Rabatt:</th>
        <td></td>
        <td>${rabattToString}</td>
        <td></td>
    </tr>
    <tr>
        <th>Gesamt:</th>
        <td></td>
        <td></td>
        <td></td>
        <td>${formatNumber(totalAmount)}</td>
    </tr>
    <tr>
        <th>Mit Rabatt:</th>
        <td></td>
        <td></td>
        <td></td>
        <td>${formatNumber(rabattAmount)}</td>
    </tr>
    <tr>       
        <td colspan="3">Rabatt Optional.</td>     
    </tr>
`;
}


function makeRabatt() {
    let rabattInput = getHTMLElem('rabatt-input');
    if (rabattInput.value == 'rabattEuro') {
        rabatt = 4;
        percent = false;
    }

    if (rabattInput.value == 'rabattPercent') {
        rabatt = 4;
        percent = true;
    }
    clearRabattInput();
    loadBasket();
}



function loadPreBuildBasket() {
    // products.forEach((product) => {
    //     let newProduct = new Product(product.name, product.amount, product.prize);
    //     basket.products.push(newProduct);
    // })
    // loadBasket();
}

function fillRabattInput(rabattCode) {
    getHTMLElem('rabatt-input').value = rabattCode;
}

function clearRabattInput() {
    let rabattInput = getHTMLElem('rabatt-input');
    rabattInput.value = "";
}

function clearTableBody() {
    let basketDiv = getHTMLElem('basket-div');
    basketDiv.innerHTML = "";
}
function clearTableFooter() {
    let tableFooter = getHTMLElem('table-footer');
    tableFooter.innerHTML = "";
}


function getHTMLElem(id) {
    let elem = document.getElementById(`${id}`);
    return elem;
}