//Indica ao navegador para trabalhar estritamente com
//dados já definidos
"use strict";
//Recupera a referência ao objeto do canvas HTML
var render = new Render("tela");
//Recupera o contexto de desenho bidimensional do canvas

function desenhar() {

    render.draw();
    requestAnimationFrame(desenhar);
   
}

requestAnimationFrame(desenhar);