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
var materialLinha = new THREE.LineBasicMaterial({color: 0xffffff});
var pontos = [];

var raio = 1;


 //fechar o circulo
 /*   var x = raio * Math.cos(ang);
    var y = raio * Math.sin(ang);
    pontos.push(new THREE.Vector3(x, y, 0)); */

/*
//desenhando a metade do círculo
for(var y = -1; y<= 1; y+= 0.1){
    var x = Math.sqrt(raio - y * y);
    pontos.push(new THREE.Vector3(x, y, 0));
}
*/

//círculo paramétrico
/* for(var ang = 0; ang <= Math.PI * 2; ang += Math.PI / 3){
    var x = raio * Math.cos(ang);
    var y = raio * Math.sin(ang);
    pontos.push(new THREE.Vector3(x, y, 0));
}  */

/*
//Curva de hermite
//desenhando curvas 
//Pontos de início e fim. Coordenadas de direção 
var p1 = new THREE.Vector3(-0.5,0,0) //posições
var t1 = new THREE.Vector3(-2,2,0)
var p2 = new THREE.Vector3(0.5,0,0)
var t2 = new THREE.Vector3(1,1,0)

for(var s = 0; s <= 1; s += 0.1){ 
    var s2 = s * s;
    var s3 = s2 * s;
    var h1 = 2 * s3 - 3 * s2 + 1;
    var h2 = -2 * s3 + 3 *s2;
    var h3 = s3 - 2 * s2 + s;
    var h4 = s3 - s2;
    var pt = new THREE.Vector3(0,0,0);
    pt.add(p1.clone().multiplyScalar(h1));
    pt.add(p2.clone().multiplyScalar(h2));
    pt.add(t1.clone().multiplyScalar(h3));
    pt.add(t2.clone().multiplyScalar(h4));
    pontos.push(pt);

}
*/

/*
//Curva de Bezier
var curva = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 1.5, 0),
    new THREE.Vector3(2, 1.5, 0),
    new THREE.Vector3(1, 0, 0),
);

pontos = curva.getPoints(10); //Resolução
*/

//Curva de Spline
var curva = new THREE.SplineCurve( [
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1.5, 0.5, 0),
    new THREE.Vector3(2, 0, 0),
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
        render.render(cena, camera);
        requestAnimationFrame(desenhar);
    }

    requestAnimationFrame(desenhar);