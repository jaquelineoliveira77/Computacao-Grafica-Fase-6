//Indica ao navegador para trabalhar estritamente com
//dados já definidos
"use strict";
//Recupera a referência ao objeto do canvas HTML
var canvas = document.getElementById("tela");
//Recupera o contexto de desenho bidimensional do canvas
var ctx = canvas.getContext("2d"); //Não utilizado em WebGL
//var x = 200, y = 100, larg = 10, alt = 10, ang = 0;
var x2 = 100, y2 = 200, ang2 = 0, larg2 = 100, alt2 = 50;
var lado = 50;

function desenharTriangulo() {
    ctx.beginPath(); //inicia o caminho
    //ctx.moveTo(x,y); //move o ponto inicial de um novo sub-caminho (sub-path) para as coordenadas (x, y) .
    //ctx.lineTo(x+50,y+50); //conecta o último ponto do sub-caminho (sub-path) para as coordenadas x, y , através de uma linha (mas na realidade não a desenha).
    //ctx.lineTo(x-50,y+50);
    //ctx.fill(); //método fill() preenche todos os valores do array a partir do índice inicial a um índice final com um valor estático
}

function desenharCirculo(){
    ctx.beginPath(); //inicia o caminho
   
   
}


function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpa todos os pixels de um retângulo definido na posição (x, y) e tamanho (width (largura), height (altura)) para uma cor preta transparente, apagando algum conteúdo anterior
    ctx.strokeStyle = "rgb(255, 128, 0)"; //Define o estilo usado ao preencher (fill) formas. Define o estilo para os contornos (strokes) das formas
    ctx.lineWidth = 2; //Esse atributo destina-se a definir a espessura das linhas, em pixel, do elemento gráfico criado. Os valores possíveis são os números inteiros
    
  
    
    //retângulo maior
    ctx.save();

        ctx.translate(x2,y2); 
        ctx.rotate(ang2);  //rotaciona
        ctx.fillStyle = "rgb(50, 10, 0)"; //cor retangulo
        ctx.fillRect(-larg2/2,-alt2/2,larg2,alt2); //desenha o retângulo
        ctx.fillStyle = "rgb(100, 100, 0)"; //cor circulo
        ctx.arc(larg2/2, alt2/2 , 20, 0, 2 * Math.PI); //mexe o circulo
        ctx.fill(); //desenha o circulo
        ctx.arc(-larg2/2, alt2/2 , 20, 0, 2 * Math.PI); //mexe o circulo
        ctx.fill(); //desenha o circulo

   
        //desenha linha
        ctx.beginPath();
        ctx.moveTo(-48, 1);
        ctx.lineTo(49, -0);
        ctx.lineTo(20, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-5, 1);
        ctx.lineTo(-5, -25); //-negativo para cima, + positivo para cima
        ctx.stroke(); //draw path

        desenharCirculo(); //chamando a função do circulo
    
        
        ctx.restore();  
        ctx.save(); //o save "salva um estado padrão
            ctx.translate(x2, y2);  //transladando
            ctx.stroke(); //stroke() é usada para desenhar as linhas e bordas ao redor do texto e das formas     
        ctx.restore(); //o restore "restaura esse estado posteriormente"
    
        
    requestAnimationFrame(desenhar); //requestAnimationFrame() fala para o navegador que deseja-se realizar uma animação e pede que o navegador chame uma função específica para atualizar um quadro de animação antes da próxima repaint (repintura)
}



//Indica ao navegador o que executar quando estiver pronto
//para realizar uma nova renderização
requestAnimationFrame(desenhar);

document.onkeydown = function  (evt) {
    console.log(evt.keyCode);
    switch(evt.keyCode) {
        
       case 38: 
            x2 += Math.cos(ang2)*5
            y2 += Math.sin(ang2)*5
            break; 
        case 40:
            x2 -= Math.cos(ang2)*5
            y2 -= Math.sin(ang2)*5
            break; 
        case 37:
            ang2 -= 0.1;  
            break; 
        case 39:
            ang2 += 0.1;  
            break;
        

    }
}
