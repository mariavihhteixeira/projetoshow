// Datas

const abertura = new Date("August 03, 2026 00:00:00").getTime();

const show = new Date("October 28, 2026 20:00:00").getTime();

let estoque = 50000;

//===============================

function atualizarContador(data, elemento){

    const agora = new Date().getTime();

    let distancia = data - agora;

    if(distancia < 0){

        document.getElementById(elemento).innerHTML="EVENTO INICIADO";

        return;

    }

    let dias=Math.floor(distancia/(1000*60*60*24));

    let horas=Math.floor((distancia%(1000*60*60*24))/(1000*60*60));

    let minutos=Math.floor((distancia%(1000*60*60))/(1000*60));

    let segundos=Math.floor((distancia%(1000*60))/1000);

    document.getElementById(elemento).innerHTML=

    dias+"d "
    +horas+"h "
    +minutos+"m "
    +segundos+"s";

}

setInterval(()=>{

    atualizarContador(abertura,"contadorVenda");

    atualizarContador(show,"contadorShow");

},1000);

//==================================

const form=document.getElementById("formIngresso");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    let qtd=parseInt(document.getElementById("quantidade").value);

    let valor=parseFloat(document.getElementById("tipo").value);

    let setor=document.getElementById("setor").value;

    if(estoque==0){

        alert("Ingressos esgotados!");

        return;

    }

    if(qtd>estoque){

        alert("Não existem ingressos suficientes.");

        return;

    }

    estoque-=qtd;

    document.getElementById("estoque").innerHTML=estoque;

    let total=qtd*valor;

    document.getElementById("resultado").innerHTML=

    "Compra realizada!<br><br>" +

    "Setor: "+setor+"<br>" +

    "Quantidade: "+qtd+"<br>" +

    "Total: R$ "+total.toFixed(2);

});
