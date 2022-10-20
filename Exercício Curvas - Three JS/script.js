"use strict";

//Objeto cena é quem gerencia tudo que deve existir em uma cena
var cena = new THREE.Scene();
//Câmera é uma configuração sobre como e de que posição remos observar a cena
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

//Renderizador utilizará a cena e a camêra para exibir a imagem
var render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
//O canvas será construído pelo renderizador
var canvas = render.domElement;
document.body.appendChild(canvas);

//Vamos desenhar a linha. Quer dizer o círculo!
var materialLinha = new THREE.LineBasicMaterial({color: 0xff0000});
var pontos = [];

var raio = 1;

//Curva de Bezier
var curva = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 1.5, 0),
    new THREE.Vector3(2, 1.5, 0),
    new THREE.Vector3(1, 0, 0),

);

pontos = curva.getPoints(10); //Resolução

//Curva de Spline
var curva = new THREE.SplineCurve( [
   new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0.5, 0.5, 0),

   
]);

pontos = curva.getPoints(50); //Resolução

//Desenhar os pontos de referência
var materialPonto = new THREE.PointsMaterial({size: 10, sizeAttenuation: false});

for (let p of curva.points){
    var coord = [];
    coord.push(new THREE.Vector3( p.x, p.y, p.z));
    var geometriaPonto = new THREE.BufferGeometry().setFromPoints( coord);
    var ponto = new THREE.Points(geometriaPonto, materialPonto);
    cena.add(ponto);
}

    var geometriaLinha = new THREE.BufferGeometry().setFromPoints(pontos);
    var linha = new THREE.Line(geometriaLinha, materialLinha);
    cena.add(linha);
    camera.position.z = 5;

function desenhar(){
    
    cena.rotation.z += 0.01;
    cena.rotation.x += 0.01;
    cena.rotation.y += 0.01;
    render.render(cena, camera);
    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);