import { prateleira } from "./prateleira.js"

let carrinho = 0;
let carrinho_lista = [];

function buyItem(num) {
    let itemPrice = prateleira["produtos"][num]["atributos"]["price"]
    let itemName = prateleira["produtos"][num]["atributos"]["nome"]
    carrinho += itemPrice
    document.getElementById("p-totalShopping").innerHTML = `R$ ${carrinho.toFixed(2)}`

    let inserirProduto = { "nome_prod": itemName, "preco_prod": itemPrice };

    carrinho_lista.push(inserirProduto);
}

/* Animação goto Pagamento */

function goToPayment() {
    let article = document.getElementById("article-up");
    let article_payment = document.getElementById("article-down");

    article.style.transition = "0.5s ease-in";
    article.style.transform = "translateX(40px)";
    article.style.opacity = "0";
    document.getElementById("p-valor-a-pagar").innerHTML = `Total a pagar: R$ ${(carrinho - (carrinho*0.1)).toFixed(2)} (desconto à vista de 10%)`
    setTimeout(() => {
        article.style.display = "none";
        article_payment.style.display = "flex";
        article_payment.style.opacity = 1
    }, 800);

    carrinho_lista.forEach((produto) => {
        let listagem_produto = document.getElementById("div-listagem-produto");
        let listagem_preco = document.getElementById("div-listagem-preco");
        let listagem_qntd = document.getElementById("div-listagem-qntd");

        let l_prod = document.createElement("p");
        let l_preco = document.createElement("p");
        let l_qntd = document.createElement("p");

        l_prod.innerHTML= `<p>${produto.nome_prod}</p>`
        l_preco.innerHTML = `<p>R$ ${produto.preco_prod}</p>`
        l_qntd.innerHTML= `<p>1</p>`

        listagem_produto.appendChild(l_prod);
        listagem_preco.appendChild(l_preco);
        listagem_qntd.appendChild(l_qntd);
    })
}

function checkCredito() {
    let checkSeParcela = document.getElementById("select-pagamento");
    let form_parcela = document.getElementById("form-parcelas");
    let info_credit = document.getElementById("div-credit-info")

    switch (checkSeParcela.value){
        default:
            document.getElementById("p-valor-a-pagar").innerHTML = `Total a pagar: R$ ${(carrinho - (carrinho*0.1)).toFixed(2)} (desconto à vista de 10%)`
        case "pix":
            form_parcela.style.display = "none";
            info_credit.style.display = "none";
            document.getElementById("p-valor-a-pagar").innerHTML = `Total a pagar: R$ ${(carrinho - (carrinho*0.1)).toFixed(2)} (desconto à vista de 10%)`
            document.getElementById("select-parcelas").value = ""
            break
        case "credito-vista":
            info_credit.style.display = "flex";
            form_parcela.style.display = "none";
            document.getElementById("p-valor-a-pagar").innerHTML = `Total a pagar: R$ ${carrinho.toFixed(2)}`;
            document.getElementById("select-parcelas").value = ""
            break
        case "credito-parcelado":
            form_parcela.style.display = "flex";
            info_credit.style.display = "flex";
            document.getElementById("p-valor-a-pagar").innerHTML = "Selecione uma parcela";
            break
    }
}

function calcParcela() {
    let parcelas = parseInt(document.getElementById("select-parcelas").value);
    let total_pagar = document.getElementById("p-valor-a-pagar");
    let calc_total = carrinho * Math.pow((1 + 0.01), parcelas);
    total_pagar.innerHTML = `Total a pagar: R$ ${calc_total.toFixed(2)} (juros 1% a.m)`;
}

function validarSeLetra(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
}

function formatacaoCartao(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
}

function validateForm() { 
    let checkSeParcela = document.getElementById("select-pagamento");

    if (checkSeParcela.value == "credito-vista" || checkSeParcela.value == "credito-parcelado") {
        const inputs = document.querySelectorAll('#div-credit-info input'); 
        let allFilled = true; 
        inputs.forEach(input => 
            { if (input.value.trim() === '') 
                { allFilled = false; input.style.border = '2px solid red'; 
                    } else { input.style.border = '';
                    } }); 
                    if (allFilled) { 
                        alert('Todos os campos estão preenchidos. Procedendo com o pagamento.');
                    }
        } else {
            alert('Todos os campos estão preenchidos. Procedendo com o pagamento.');
        }
    }

/* Subindo módulos */
window.buyItem = buyItem;
window.goToPayment = goToPayment;
window.checkCredito = checkCredito;
window.calcParcela = calcParcela;
window.validarSeLetra = validarSeLetra;
window.formatacaoCartao = formatacaoCartao;
window.validateForm = validateForm