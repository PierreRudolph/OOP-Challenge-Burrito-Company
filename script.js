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
let rabatt = 0;
let percent = false;
let products = [
    {
        name: 'Cheese Burrito',
        amount: 3,
        prize: 8.50
    },
    {
        name: 'Salad Burrito',
        amount: 4,
        prize: 3.50
    },
    {
        name: 'Pork Burrito',
        amount: 3,
        prize: 6.50
    },
]


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

    if (!percent) {
        rabattAmount = totalAmount - rabatt
    }
    if (percent) {
        rabattPecent = totalAmount * rabatt / 100;
        rabattAmount = totalAmount - rabattPecent;
    }
    innerHTMLTotalPrize(totalAmount, rabattAmount);
}


function innerHTMLTotalPrize(totalAmount, rabattAmount) {
    let tableFooter = getHTMLElem('table-footer');
    if (!percent) {
        rabatt = formatNumber(rabatt);
    } else {
        rabatt = rabatt + '%';
    }
    tableFooter.innerHTML +=/*html*/`
    <tr>
        <th>Rabatt:</th>
        <td></td>
        <td>${rabatt}</td>
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
    //clearBasket();
    products.forEach((product) => {
        let newProduct = new Product(product.name, product.amount, product.prize);
        basket.products.push(newProduct)
    })
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