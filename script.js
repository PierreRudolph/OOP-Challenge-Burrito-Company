/**
 * Represents a shopping basket.
 */
class Basket {
    /**
    * Array containing products in the basket.
    * @type {Product[]}
    */
    products = [];

    constructor() {

    }
}

/**
 * Represents a product.
 */
class Product {
    /**
     * Name of the product.
     * @type {string}
     */
    name = "";
    /**
   * Quantity of the product.
   * @type {number}
   */
    amount = 0;
    /**
    * Price of the product.
    * @type {number}
    */
    price = 0;
    /**
    * Unique identifier for the product.
    * @type {number}
    */
    id = 0;
    /**
        * Creates an instance of Product.
        * @param {string} [name=''] - Name of the product.
        * @param {number} [amount=0] - Quantity of the product.
        * @param {number} [prize=0] - Price of the product.
        * @param {number} [id=0] - Unique identifier for the product.
        */
    constructor(name, amount, prize, id) {
        this.name = name ? name : '';
        this.amount = amount ? amount : '';
        this.price = prize ? prize : '';
        this.id = id ? id : '';
    }
}


// Global variables
let basket = new Basket();
let discount = 0;
let percent = false;
let totalAmount = 0;
let discountAmount = 0;
let discountPercent = 0;
/**
 * Array of Predefined Products
 */
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


/**
 * Adds a product to the basket.
 * @param {number} id - The id of the product to be added.
 */
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


/**
 * Iterates through the products in the basket to update the quantity of an existing product or add a new product.
 * @param {Product} newProduct - The product to be added or updated.
 */
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


/**
 * Checks if the basket is empty.
 * @returns {boolean} True if the basket is empty, false otherwise.
 */
function basketIsEmpty() {
    return basket.products.length == 0;
}


/**
 * Checks if a product is already in the basket.
 * @param {Product} newProduct - The product to check.
 * @returns {boolean} True if the product is in the basket, false otherwise.
 */
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


/**
 * Generates HTML for displaying the list of products.
 */
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


/**
 * Clears the basket and loads its HTML representation.
 */
function createBasket() {
    clearTableBody();
    loadBasket();
}


/**
 * Formats a number as currency using the locale.
 * @param {number} num - The number to format as currency.
 * @returns {string} The formatted currency string.
 */
function formatNumber(num) {
    const locals = 'de-De';
    const options = { style: 'currency', currency: 'EUR' };
    return new Intl.NumberFormat(locals, options).format(num);
}


/**
 * Loads the HTML representation of the basket.
 */
function loadBasket() {
    let basketDiv = getHTMLElem('basket-div');
    totalAmount = 0;
    clearTableBody();
    clearTableFooter();
    renderBasket(basketDiv);
    calculateDiscount();
    renderSum();
}


/**
 * Renders the HTML representation of the basket.
 * @param {HTMLElement} basketDiv - The DOM element where the basket will be rendered.
 */
function renderBasket(basketDiv) {
    basket.products.forEach(element => {
        let prizeSum = element.price * element.amount;
        basketDiv.innerHTML +=/*html*/`
        <tr>
            <td>${element.name}</td>
            <td>${element.amount}</td>
           <td>${formatNumber(element.price)}</td>
           <td></td>
            <td>${formatNumber(prizeSum)}</td>
        </tr>
    `;
        addToTotalAmount(prizeSum);
    });
}


/**
 * Adds the prize of a product to the total amount.
 * @param {number} prizeSum - The prize of a product.
 */
function addToTotalAmount(prizeSum) {
    totalAmount = totalAmount + prizeSum;
}


/**
 * Calculates the discount amount.
 */
function calculateDiscount() {
    if (!percent && discount > 0) {
        discountAmount = totalAmount - discount
    }
    if (percent && discount > 0) {
        discountPercent = totalAmount * discount / 100;
        discountAmount = totalAmount - discountPercent;
    }
}


/**
 * Renders the summary section of the basket.
 */
function renderSum() {
    let tableFooter = getHTMLElem('table-footer');
    let rabattToString = getRabattToString();

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
            <td>${formatNumber(discountAmount)}</td>
        </tr>
        <tr>       
            <td colspan="3">Rabatt Optional.</td>     
        </tr>
    `;
}


/**
 * Converts the discount to a string representation.
 * @returns {string} The string representation of the discount.
 */
function getRabattToString() {
    if (!percent) {
        return formatNumber(discount);
    } else {
        return discount + '%';
    }
}



/**
 * Applies the discount to the basket.
 */
function applyRabatt() {
    let rabattInput = getHTMLElem('rabatt-input');
    if (rabattInput.value == 'rabattEuro') {
        discount = 4;
        percent = false;
    }

    if (rabattInput.value == 'rabattPercent') {
        discount = 4;
        percent = true;
    }
    clearRabattInput();
    loadBasket();
}


/**
 * Fills the discount input with the provided code.
 * @param {string} rabattCode - The discount code to fill.
 */
function fillRabattInput(rabattCode) {
    getHTMLElem('rabatt-input').value = rabattCode;
}


/**
 * Clears the discount input field.
 */
function clearRabattInput() {
    let rabattInput = getHTMLElem('rabatt-input');
    rabattInput.value = "";
}


/**
 * Clears the table body in the basket.
 */
function clearTableBody() {
    let basketDiv = getHTMLElem('basket-div');
    basketDiv.innerHTML = "";
}


/**
 * Clears the table footer in the basket.
 */
function clearTableFooter() {
    let tableFooter = getHTMLElem('table-footer');
    tableFooter.innerHTML = "";
}


/**
 * Retrieves the HTML element by its ID.
 * @param {string} id - The ID of the HTML element.
 * @returns {HTMLElement} The HTML element.
 */
function getHTMLElem(id) {
    let elem = document.getElementById(`${id}`);
    return elem;
}