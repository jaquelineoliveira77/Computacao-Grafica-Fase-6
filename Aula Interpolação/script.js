//Indica ao navegador para trabalhar estritamente com dados já definidos
"use strict";

//Recupera a referência ao objeto canvas HTML
var canvas = document.getElementById("tela");
//Recupera o contexto de desenho bidimensional do canvas
var ctx = canvas.getContext("2d");

var pontos = [];
pontos.push({x: 20, y:20, r: 255, g: 0, b: 0}); //0 CE
pontos.push({x: 580, y:20, r: 0, g: 255, b: 0}); //1 CD
pontos.push({x: 580, y:480, r: 255, g: 0, b: 255}); //2 BD
pontos.push({x: 20, y:480, r: 255, g: 255, b: 0}); //3 BE

var lado = 5;

function desenhar(){
    for (let p of pontos){
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = "rgb(" + p.r + "," + p.g + "," + p.b + ")";
        ctx.fillRect(-lado/2, -lado/2, lado, lado);
        ctx.restore();
    }
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);

function BilinearInt(xm, ym){
    //Interpolação das linhas superior da direita
    //distância entre cantos
    var maxx = pontos[1].x - pontos[0].x;
    //Proporção de intensidade da direita
    var dx = (xm - pontos[0].x) / maxx;
    //Proporção de intensidade da esquerda (complemento)
    var ex = 1 - dx;

    //R do ponto superior interpolado
    var rc = pontos[0].r * ex + pontos[1].r * dx;
    var gc = pontos[0].g * ex + pontos[1].g * dx;
    var bc = pontos[0].b * ex + pontos[1].b * dx;
    //R do ponto inferior interpolado
    var rb = pontos[3].r * ex + pontos[2].r * dx;
    var gb = pontos[3].g * ex + pontos[2].g * dx;
    var bb = pontos[3].b * ex + pontos[2].b * dx;

    //Distância entre pontos interpolados
    var maxy = pontos[3].y - pontos[0].y;
    //Proporção de intensidade do ponto interpolado de baixo
    var by = (ym - pontos[0].y) / maxy;
    //Proporção de intensidade do ponto interpolado de cima
    var ty = 1 - by;

    //R do ponto central interpolado
    var rm = Math.round(rc * ty + rb * by);
    var gm = Math.round(gc * ty + gb * by);
    var bm = Math.round(bc * ty + bb * by);

    //Resultado
    return {x: xm, y: ym, r:rm, g: gm, b: bm};
}//Fim da função

canvas.addEventListener("mousedown", function (e){
    pontos.push(BilinearInt(e.offsetX, e.offsetY));
}, false);
