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
        prize: 8.99,
        id: 1234
    },
    {
        name: 'Salad Burrito',
        prize: 3.49,
        id: 1345
    },
    {
        name: 'Pork Burrito',
        prize: 6.49,
        id: 1456
    },
    {
        name: 'Chicken Burrito',
        prize: 7.79,
        id: 1567
    },
    {
        name: 'Fancy Burrito',
        prize: 9.99,
        id: 1678
    }
]


function addProduct(id) {
    let newProduct = '';
    products.forEach((product) => {
        newProduct = (product.id == id) ? newProduct = product : newProduct;
    })
    if (basketIsEmpty()) {
        basket.products.push(new Product(newProduct.name, 1, newProduct.prize, newProduct.id))
        loadBasket();
        return
    } else {
        iterateThruBasket(newProduct);
    }
}


function iterateThruBasket(newProduct) {
    for (let i = 0; i < basket.products.length; i++) {
        const product = basket.products[i];
        if (newProduct.id == product.id) {
            product.amount = product.amount + 1;
            loadBasket();
            return;
        } if (!isInBasket(newProduct)) {
            basket.products.push(new Product(newProduct.name, 1, newProduct.prize, newProduct.id));
            loadBasket();
            return;
        }
    }
}


function basketIsEmpty() {
    return basket.products.length == 0;
}


function isInBasket(newProduct) {
    let isInBasket = false;
    for (let i = 0; i < basket.products.length; i++) {
        const element = basket.products[i];
        if (newProduct.id == element.id) {
            isInBasket = true;
            return isInBasket;
        }
    }
    return isInBasket;
}


function createProductList() {
    let productList = getHTMLElem('product-list');
    productList.innerHTML = '';
    products.forEach((product) => {
        let productPrize = formatNumber(product.prize);
        productList.innerHTML +=/*html*/`
        <tr class="product-row" onclick="addProduct(${product.id})">
                        <td>${product.name}</td>
                        <td class="text-center">${productPrize}</td>
                    </tr>
        `;
    })
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
        <td></td>
        <td></td>
        <td>${rabattToString}</td>
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