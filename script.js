// ==========================
// DATAS DOS EVENTOS
// ==========================
// Nota: No JavaScript, os meses começam no 0 (Janeiro = 0, Agosto = 7, Outubro = 9)
const abertura = new Date(2027, 7, 3, 0, 0, 0).getTime(); // 3 de Agosto de 2026
const show = new Date(2027, 9, 28, 20, 0, 0).getTime();   // 28 de Outubro de 2026

// ==========================
// ESTOQUE
// ==========================
let estoque = 50000;

// O código abaixo aguarda o HTML carregar completamente antes de rodar as funções,
// evitando que o script trave ou que o cronômetro fique zerado.
window.addEventListener("DOMContentLoaded", () => {

    // Inicializa o estoque na tela
    const elementoEstoque = document.getElementById("estoque");
    if (elementoEstoque) {
        elementoEstoque.innerHTML = estoque;
    }

    // ==========================
    // FUNÇÃO DO CRONÔMETRO
    // ==========================
    function atualizarContador(dataFinal, idElemento) {
        const agora = new Date().getTime();
        const diferenca = dataFinal - agora;
        const elemento = document.getElementById(idElemento);

        // Se o elemento não existir no HTML, evita erros no console
        if (!elemento) return;

        // Se o tempo já acabou
        if (diferenca <= 0) {
            elemento.innerHTML = "00d 00h 00m 00s";
            return;
        }

        // Seus cálculos matemáticos corretos
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Formatação visual: adiciona um "0" à esquerda para números menores que 10
        const d = dias < 10 ? "0" + dias : dias;
        const h = horas < 10 ? "0" + horas : horas;
        const m = minutos < 10 ? "0" + minutos : minutos;
        const s = segundos < 10 ? "0" + segundos : segundos;

        // Atualiza o texto na tela
        elemento.innerHTML = d + "d " + h + "h " + m + "m " + s + "s";
    }

    // Atualiza imediatamente ao abrir a página (evita o delay de 1 segundo)
    atualizarContador(abertura, "contadorVenda");
    atualizarContador(show, "contadorShow");

    // Atualiza os contadores a cada 1 segundo
    setInterval(function () {
        atualizarContador(abertura, "contadorVenda");
        atualizarContador(show, "contadorShow");
    }, 1000);

    // ==========================
    // COMPRA DOS INGRESSOS
    // ==========================
    const formulario = document.getElementById("formIngresso");

    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            const setor = document.getElementById("setor").value;
            const quantidade = parseInt(document.getElementById("quantidade").value);
            const preco = parseFloat(document.getElementById("tipo").value);

            // Validações
            if (quantidade <= 0 || isNaN(quantidade)) {
                alert("Informe uma quantidade válida.");
                return;
            }

            if (quantidade > estoque) {
                alert("Quantidade indisponível.");
                return;
            }

            // Atualiza a variável e a interface
            estoque -= quantidade;
            document.getElementById("estoque").innerHTML = estoque;

            const total = quantidade * preco;

            // Renderiza o resultado na tela
            document.getElementById("resultado").innerHTML =
                "<h2>Compra realizada com sucesso!</h2>" +
                "<br><b>Setor:</b> " + setor +
                "<br><b>Quantidade:</b> " + quantidade +
                "<br><b>Valor Unitário:</b> R$ " + preco.toFixed(2) +
                "<br><b>Total:</b> R$ " + total.toFixed(2);

            // Limpa os campos do formulário
            formulario.reset();
        });
    }
});


