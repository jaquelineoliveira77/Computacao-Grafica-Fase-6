//Indica ao navegador para trabalhar estritamente com dados já definidos
"use strict";

//Recupera a referência ao objeto canvas HTML
var canvas = document.getElementById("tela");
//Recupera o contexto de desenho bidimensional do canvas
var ctx = canvas.getContext("2d");

var x = 200, y = 100, larg = 300, alt = 150;

function desenharTriangulo() {
    ctx.beginPath(); //inicia o caminho
    ctx.moveTo(x,y);
    ctx.lineTo(x+50,y+50);
    ctx.lineTo(x-50,y+50);
    ctx.fill();
}

function desenharCirculo(){
    ctx.beginPath(); //inicia o caminho
    ctx.arc(x, y , 50, 0, 2 * Math.PI);
    ctx.fill();
}

function desenhar(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 128, 0)";
    //ctx.fillRect(x, y, larg, alt);
    //desenharTriangulo();
    desenharCirculo();
    requestAnimationFrame(desenhar);
    

}

requestAnimationFrame(desenhar);

//document.onkeydown = function (evt) { //onkeydown tecla afundada, onkeyup quado solta a tecla
 //   console.log("keyCode: " + evt.keyCode);
 //   console.log("key: " + evt.key);
 
//}

//Tarefa 1: Verificar código de teclas das setas em evt.keyCode
//e fazer o retângulo mover com base na direção das setas.

document.onkeydown = function(evt){
    console.log("Nome da tecla " + evt.key +" Numero" + evt.keyCode)
    if(evt.key == "ArrowUp"){
        y -= 5
    }else if(evt.key == "ArrowDown"){
        y += 5
    }else if(evt.key == "ArrowLeft"){
        x -= 5
    }else if(evt.key == "ArrowRight"){
        x += 5
    }
}

//Tarefa 2: Substitua o retângulo por outras formas geométricas
//Exemplo: triângulo, circulo e polígono

//https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#a_grade



