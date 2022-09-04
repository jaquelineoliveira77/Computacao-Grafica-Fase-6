//Indica ao navegador para trabalhar estritamente com dados já definidos
"use strict";

//Recupera a referência ao objeto canvas HTML
var canvas = document.getElementById("tela");
//Recupera o contexto de desenho bidimensional do canvas
var ctx = canvas.getContext("2d");

//var x = 200, y = 100, larg = 300, alt = 150;
var x = 200, y = 100, larg = 10, alt = 10;
var ang = 0;

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

/*
function desenhar(){

    ctx.clearRect(0, 0, canvas.width, canvas.height); //vai limpar a tela
    //ang += 0.1;
    ctx.save(); //salva o estado atual, grava a posição que está
        ctx.translate(x,y); //move centro de coordenadas, para onde quero levar, translação é a movimentação dos vértices
        //ctx.rotate(ang);
        //ctx.translate(0,100); //move centro de coordenadas
        //ctx.translate(100,0); //move centro de coordenadas
        ctx.fillStyle = "rgb(200, 200, 200)";
        ctx.fillRect(-larg/2, 0, larg, alt); //desenhando uma casa / https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
        ctx.fillStyle = "rgb(255, 64, 0)";
        ctx.beginPath(); //desenha triângulo
        ctx.moveTo(-larg/2, 0);
        ctx.lineTo(0, -alt);
        ctx.lineTo(larg/2, 0);
        ctx.fill();

    ctx.restore(); //volta para o ponto do último que salvei, onde dei o save(), restaura onde foi salvo

    //ctx.fillRect(x, y, larg, alt); //desenho retângulo
    //desenharTriangulo();
    //desenharCirculo();
    requestAnimationFrame(desenhar);   

}
}*/

function desenhar(){

    ctx.clearRect(0, 0, canvas.width, canvas.height); //vai limpar a tela
    ctx.fillStyle = "rgb(0, 0, 200)";
    ctx.strokeStyle = "rgb(255, 128, 0)";
    ctx.lineWidth = 2; //expessura do retangulo(linha)
    ctx.save(); //salva o estado atual, grava a posição que está
        ctx.translate(x,y); //move centro de coordenadas, para onde quero levar, translação é a movimentação dos vértices
        ctx.rotate(ang);
        ctx.beginPath(); //desenha várias linhas
            ctx.moveTo(0, 0);
            ctx.lineTo(50,0);
        ctx.stroke(); //retangulo(linha laranja)
        ctx.fillRect(-larg/2, -alt/2, larg, alt); //desenha o retângulo azul
    ctx.restore(); //volta para o ponto do último que salvei, onde dei o save(), restaura onde foi salvo

    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);

document.onkeydown = function(evt){    
    switch (evt.keyCode) {

        case 38:  /*seta para cima */
        y = y-5
            break;
        case 40:   /*set para baixo*/
        y += 5
            break;
        case 37:   /*set para esquerda*/
        x -= 5
            break;
        case 39:   /*seta para direita*/
        x += 5
            break;
        case 221:   /* { tecla abre chaves, gira igual um ponteiro de relógio */
        ang = ang + 5 
            break;    
        case 220:  
        ang = ang - 5 /* } tecla fecha chaves, gira igual um ponteiro de relógio */
            break;
    

            

    }
}
