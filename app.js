import { prateleira } from "./prateleira.js"

/*
for (let i = 0; i <= 8; i++) {
    console.log(`Id do produto: ${prateleira["produtos"][i]["id"]} / Nome do produto: ${prateleira["produtos"][i]["atributos"]["nome"]} / Preço: ${prateleira["produtos"][i]["atributos"]["price"]}`)
}*/

let carrinho = 0;

function buyItem(num) {
    let itemPrice = prateleira["produtos"][num]["atributos"]["price"]
    carrinho += itemPrice
    document.getElementById("p-totalShopping").innerHTML = `R$ ${carrinho.toFixed(2)}`
}

/* Animação goto Pagamento */

function goToPayment() {
    let article = document.getElementById("article-");

    article.style.transition = "0.8s ease-in";
    article.style.transform = "translateX(40px)";
    article.style.opacity = "0";
    setTimeout(() => {
        article.style.display = "none";
    }, 800);
}


/* Subindo módulos */
window.buyItem = buyItem;
window.goToPayment = goToPayment;