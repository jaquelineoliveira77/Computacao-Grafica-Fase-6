"use strict";

//Objeto cena é quem gerencia tudo que deve existir em uma cena
var cena = new THREE.Scene();

//Câmera é uma configuração sobre como e de que posição iremos observar a cena
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

//Renderizador utilizará a cena e a camêra para exibir a imagem
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);

//O canvas será construído pelo renderizador
var canvas = render.domElement;
document.body.appendChild(canvas);

//Após criar a cena, render, câmera, inserir o canvas e luzes
function gerarCilindroLinhas(raio = 1, altura = 2, pRaio = 8){
    var pontos = [];

    for (var a = 0; a <= Math.PI*2; a += (Math.PI * 2) / pRaio){
        var x = Math.sin(a) * raio;
        var z = Math.cos(a) * raio;
        pontos.push(new THREE.Vector3(x, -altura/2, z));
        pontos.push(new THREE.Vector3(x, altura/2, z));
    }
    return new THREE.BufferGeometry().setFromPoints( pontos );

}

//função gerar quadro
function gerarQuadro(larg = 1, alt = 1){
    var pontos = [];
    pontos.push(new THREE.Vector3(-larg/2, alt/2));
    //pontos.push(new THREE.Vector3(larg/2, alt/2)); //forma um triângulo
    pontos.push(new THREE.Vector3(-larg/2, -alt/2));
    pontos.push(new THREE.Vector3(larg/2, alt/2)); //forma um quadrado

    pontos.push(new THREE.Vector3(larg/2, alt/2));
    pontos.push(new THREE.Vector3(-larg/2, -alt/2));
    pontos.push(new THREE.Vector3(larg/2, -alt/2));
    return new THREE.BufferGeometry().setFromPoints( pontos );
}

function gerarCilindro(r = 1, alt = 1, pRaio = 4){
    var pontos = [];
    for (var a = 0; a <= Math.PI*2; a += (Math.PI * 2) / pRaio){
        //x do ângulo atual
        var x = Math.sin(a) * r;
        //próximo ângulo
        var x2 = Math.sin(a+(Math.PI * 2) / (pRaio) * r);
        //z do ângulo atual
        var z = Math.cos(a) * r;
        //z próximo ângulo
        var z2 = Math.cos(a+(Math.PI * 2) / (pRaio)) * r;

        //primeiro triângulo - vértice inferior atual
        pontos.push(new THREE.Vector3(x, -alt/2, z));
        //próximo vértice superior
        pontos.push(new THREE.Vector3(x2, alt/2, z2));
        //vértice superior atual
        pontos.push(new THREE.Vector3(x, alt/2, z));
        //segundo triângulo - vértice inferior atual
        pontos.push(new THREE.Vector3(x, -alt/2, z));
        //próximo inferior
        pontos.push(new THREE.Vector3(x2, -alt/2, z2));
        //próximo superior
        pontos.push(new THREE.Vector3(x2, alt/2, z2));
}
    return new THREE.BufferGeometry().setFromPoints( pontos );
}

    //Após função gerarCilindroLinhas()
    /*var forma = new THREE.LineSegments(
    gerarCilindroLinhas(1,2,70), //função que gera um cilindro com linhas
    new THREE.LineBasicMaterial({color: 0xffffff}) //link cores hexadecimal https://erikasarti.com/html/tabela-cores/
    );
    */

   /*var forma = new THREE.Mesh(
    gerarQuadro(2,2), 
    new THREE.LineBasicMaterial({color: 0xB22222}) 
    );
    */
   var forma = new THREE.Mesh(
    gerarCilindro(1,2,8), 
    new THREE.LineBasicMaterial({color: 0xB22222}) 
    );


    //para mexer com a camêra
    var controles = new THREE.OrbitControls(camera, render.domElement);

    cena.add( forma );
    camera.position.z = 5; //posição da câmera

    forma.material.wireframe = true; //para mostrar apenas os desenhos dos triângulos
    

    ///criar função desenhar
    function desenhar(){
        //O método de render é responsável por pegar as informações e renderizar na tela. Esse processo transforma um ou mais arquivos num único resultado final
        render.render(cena, camera);
        requestAnimationFrame(desenhar);
    }

    requestAnimationFrame(desenhar);