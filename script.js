let cart = [];
let objectInCart = [];
let amounts = [];
let prices = [];
let menus = [
  { menu: "Pizza Margarita", price: "6.50" },
  { menu: "Pizza Hawai", price: "7.50" },
  { menu: "Pizza Funghi", price: "7.20" },
  { menu: "Lasagne", price: "8.50" },
  { menu: "Insalata Tonno", price: "8.20" },
  { menu: "Cola", price: "2.50" },
];
let sumCompletein;
let inCart = 0;

function orderMenu(i) {
  inCart++;
  let menu = menus[i]["menu"];
  let prize = +menus[i]["price"];
  prize = prize.toFixed(2);
  if (!isIn(menu, cart)) {
    prices.push(prize);
    cart.push(menu);
    amounts.push(1);
  } else {
    let indexMenu = cart.indexOf(menu);
    amounts[indexMenu]++;
  }
  addContent(cart, amounts);
  addCalculation(amounts, prices);
}

function addContent(cart, amounts) {
  document.getElementById("inCart").innerHTML = `${inCart}`;
  let content = document.getElementById("content-cart-container");
  content.innerHTML = "";
  content.innerHTML += `<table id="orderd-menu"></table>`;
  let table = document.getElementById("orderd-menu");
  for (let i = 0; i < cart.length; i++) {
    let sumMenu;
    sumMenu = amounts[i] * prices[i];
    sumMenu = sumMenu.toFixed(2);
    tableHTML(i,sumMenu,table);
  }
}

function tableHTML(i,sumMenu,table){
  table.innerHTML += `
        <tr>
        <td id="menuAmount">${amounts[i]}</td>
        <td><span>x</span></td>
        <td id= "menuName">${cart[i]}</td>
        <td><button onclick="oneless(${i})">-</button></td>
        <td><button onclick="onemore(${i})">+</button></td>
        <td><div id="sumMenu">${sumMenu}</div></td>
        <td><span>Euro</span></td>
        <td><img id="trash" onclick="toTrash(${i})" src="img/trash.png"></td>
        </tr>`;
}

function addCalculation(amounts, prices) {
  let calculation = document.getElementById("calculation-container");
  calculation.innerHTML = "";
  let sum = 0;
  for (let i = 0; i < amounts.length; i++) {
    sum += amounts[i] * +prices[i];
  }
  sumCompletein = sum + 2;
  sum = sum.toFixed(2);
  sumCompletein = sumCompletein.toFixed(2);
  writeCalculation(calculation, sum, sumCompletein);
  document.getElementById(
    "cartvalue"
  ).innerHTML = `<b>${sumCompletein}</b> Euro `;
  calculation.innerHTML += `<button id="orderAll" class="orderAll active" onclick="sendOrder()">Bestellen</button>`;
  underTen(calculation, sum);
}

function underTen(container, sum) {
  if (sum < 10) {
    let less = 10 - sum;
    less = less.toFixed(2);
    container.innerHTML += `
             <div class="limit-text"><p><b>Benötigter Betrag um den Mindestbestellwert zu erreichen:</b></p><span>${less} Euro</span></div>
             <div id="infolimit">Leider können Sie noch nicht bestellen, da der Mindestbestellwert noch nicht erreicht wurde!</div>
            `;
    document.getElementById("orderAll").classList.remove("active");
    document.getElementById("orderAll").classList.add("inactive");
    document.getElementById("orderAll").removeAttribute("onclick");
  }
}

function writeCalculation(container, sum, sumCompletein) {
  container.innerHTML += `
  <div id="calculation">
  <div class="calculation-text"><span>Zwischensumme</span><span>${sum} Euro</span></div>
  <div class="calculation-text"><span >Lieferkosten</span><span>2 Euro</span></div>
  </div>
  <div id="CompletePrice">
  <span class="calculation-text"><b>Gesamt</b></span><span>${sumCompletein} Euro</span>
  </div>`;
}

function isIn(item1, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] == item1) {
      return true;
    }
  }
}

function testlimit(sum) {
  let limit = document.getElementById("limit");
  limit.innerHTML = "";
  if (sum < 10) {
    limit.innerHTML = `<p>Der Mindestbestellwert ist noch nicht erreicht!</p>`;
  }
}

function onemore(i) {
  inCart++;
  amounts[i]++;
  addContent(cart, amounts);
  addCalculation(amounts, prices);
}

function oneless(i) {
  inCart--;
  amounts[i]--;
  if (amounts[i] <= 0) {
    amounts.splice(i, 1);
    prices.splice(i, 1);
    cart.splice(i, 1);
  }
  if (cart.length <= 0) {
    cartZero();
  } else {
    addContent(cart, amounts);
    addCalculation(amounts, prices);
  }
}

function toTrash(i) {
  inCart = +inCart - amounts[i];
  amounts.splice(i, 1);
  prices.splice(i, 1);
  cart.splice(i, 1);
  if (cart.length <= 0) {
    cartZero();
  } else {
    addContent(cart, amounts);
    addCalculation(amounts, prices);
  }
}

function cartZero() {
  inCart = 0;
  document.getElementById("inCart").innerHTML = `${inCart}`;
  amounts = [];
  cart = [];
  prices = [];
  let content = document.getElementById("content-cart-container");
  let calculation = document.getElementById("calculation-container");
  let limit = document.getElementById("limit");
  content.innerHTML = `<p id="empty-cart">Ihr Warenkorb ist derzeit leer!<br><br>Mindestbestellwert: 10Euro<br><br>Lieferkosten: 2 Euro</p>`;
  calculation.innerHTML = "";
  limit.innerHTML = "";
  document.getElementById("cartvalue").innerHTML = ` 0 Euro `;
}

function sendOrder() {
  let text = "";
  for (let i = 0; i < cart.length; i++) {
    text = text + amounts[i] + " x" + cart[i] + "  ";
  }
  alert("Es wird bestellt: " + text);
  cartZero();
}

function showCart() {
  let overlay = document.getElementById("overlay");
  let cartMenu = document.getElementById("cart-container");
  cartMenu.classList.add("layover");
  cartMenu.classList.remove("hide");
  overlay.classList.remove("overlay-hide");
}

function hideCart() {
  let overlay = document.getElementById("overlay");
  let cartMenu = document.getElementById("cart-container");
  cartMenu.classList.add("hide");
  cartMenu.classList.remove("layover");
  overlay.classList.add("overlay-hide");
}
