// ==========================
// DATAS DOS EVENTOS
// ==========================

// Abertura das vendas
const abertura = new Date(2026, 7, 3, 0, 0, 0).getTime();
// Agosto = 7

// Dia do show
const show = new Date(2026, 9, 28, 20, 0, 0).getTime();
// Outubro = 9

// ==========================
// ESTOQUE
// ==========================

let estoque = 50000;

document.getElementById("estoque").innerHTML = estoque;

// ==========================
// FUNÇÃO DO CRONÔMETRO
// ==========================

function atualizarContador(dataFinal, idElemento) {

    const agora = new Date().getTime();

    const diferenca = dataFinal - agora;

    if (diferenca <= 0) {

        document.getElementById(idElemento).innerHTML =
            "00d 00h 00m 00s";

        return;

    }

    const dias = Math.floor(
        diferenca / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferenca % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const segundos = Math.floor(
        (diferenca % (1000 * 60))
        / 1000
    );

    document.getElementById(idElemento).innerHTML =
        dias + "d " +
        horas + "h " +
        minutos + "m " +
        segundos + "s";

}

// Atualiza imediatamente
atualizarContador(abertura, "contadorVenda");
atualizarContador(show, "contadorShow");

// Atualiza a cada segundo
setInterval(function () {

    atualizarContador(abertura, "contadorVenda");
    atualizarContador(show, "contadorShow");

}, 1000);

// ==========================
// COMPRA DOS INGRESSOS
// ==========================

const formulario = document.getElementById("formIngresso");

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const setor =
        document.getElementById("setor").value;

    const quantidade =
        parseInt(document.getElementById("quantidade").value);

    const preco =
        parseFloat(document.getElementById("tipo").value);

    if (quantidade <= 0) {

        alert("Informe uma quantidade válida.");

        return;

    }

    if (quantidade > estoque) {

        alert("Quantidade indisponível.");

        return;

    }

    estoque -= quantidade;

    document.getElementById("estoque").innerHTML =
        estoque;

    const total = quantidade * preco;

    document.getElementById("resultado").innerHTML =

        "<h2>Compra realizada com sucesso!</h2>" +

        "<br><b>Setor:</b> " + setor +

        "<br><b>Quantidade:</b> " + quantidade +

        "<br><b>Valor Unitário:</b> R$ " +
        preco.toFixed(2) +

        "<br><b>Total:</b> R$ " +
        total.toFixed(2);

    formulario.reset();

});
