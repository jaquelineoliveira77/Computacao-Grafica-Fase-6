//Indica ao navegador para trabalhar estritamente com dados já definidos
"use strict";

//Recupera a referência ao objeto canvas HTML
var canvas = document.getElementById("tela");
//Recupera o contexto de desenho bidimensional do canvas
var ctx = canvas.getContext("2d");

var x = 200, y = 100, larg = 300, alt = 150;

function desenhar(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255, 128, 0)";
    ctx.fillRect(x, y, larg, alt);
    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);