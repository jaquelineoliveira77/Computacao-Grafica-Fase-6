        "use strict";
        // configuração da camera, perspectiva e luz
        //Objeto cena é quem gerencia tudo que deve existir em uma cena
        var scene = new THREE.Scene();

        //Câmera é uma configuração sobre como e de que posição iremos observar a cena
        var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
        
        camera.position.set(200, 500, 300);
        camera.lookAt(0, 10, 0);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(200, 500, 300);
        scene.add(directionalLight);

        //Renderizador utilizará a cena e a camêra para exibir a imagem / Renderizador - combinar imagens
        var renderer = new THREE.WebGLRenderer({antialias: true });
      
        //O canvas será construído pelo renderizador
        var canvas = renderer.domElement;
        document.body.appendChild(canvas);

        //para mexer com a camêra
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        

        //construção do cubo
        const geometryCubo = new THREE.BoxGeometry( 10, 10, 10 );
        const materialCubo = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const cube = new THREE.Mesh( geometryCubo, materialCubo );
        scene.add( cube );

        const geometryLanterna = new THREE.BoxGeometry( 5, 10, 5 );
        const materialLanterna = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        const lanterna = new THREE.Mesh( geometryLanterna, materialLanterna );
        scene.add( lanterna );

        // construção da curva
        var curve = new THREE.SplineCurve([
        new THREE.Vector3(-200, 0, 200), //formando as curvas 
        new THREE.Vector3(-100, 100, 100),
        new THREE.Vector3(-100, -200, 200),
        new THREE.Vector3(-200, -200, 200),
        new THREE.Vector3(-220, -60, 200),
        new THREE.Vector3(-200, -0, 200)]);

        var points = curve.getPoints(199);

        var geometry = new THREE.BufferGeometry().setFromPoints(points);

        var material = new THREE.MeshBasicMaterial({
        color: 0x00ffff
        });

        var curveObject = new THREE.Line(geometry, material);

        scene.add(curveObject);

        var clock = new THREE.Clock();
        var time = 0;

        function resize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
        }

        var pos = 0;
        var ang = 0;

        //criando o carro
        function createWheels() {
            const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
            const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
            const wheel = new THREE.Mesh(geometry, material);
            return wheel;
          }

          //função que cria o carro
        function createCar() {
            const car = new THREE.Group();
            
            const backWheel = createWheels();
            backWheel.position.y = 6;  //altura das rodas de trás
            backWheel.position.x = -18; //posição das rodas(formas) de trás do carro
            car.add(backWheel);
            
            const frontWheel = createWheels();
            frontWheel.position.y = 6;   //altura das rodas da frente
            frontWheel.position.x = 18;  //posição das rodas(formas) da frente do carro
            car.add(frontWheel);
          
            const main = new THREE.Mesh(
              new THREE.BoxBufferGeometry(60, 15, 30),  //desenhando as formas do carro
              new THREE.MeshLambertMaterial({ color: 0x78b14b }) //definindo a cor
            );
            main.position.y = 12;
            car.add(main);
          
            const cabin = new THREE.Mesh(
              new THREE.BoxBufferGeometry(33, 12, 24),
              new THREE.MeshLambertMaterial({ color: 0xffffff })
            );
            cabin.position.x = -6;
            cabin.position.y = 25.5;
            car.add(cabin);
            car.rotation.y = Math.PI / 2;

            return car;
          }
          
          const car = createCar();
          scene.add(car);
      
          renderer.render(scene, camera);
          //fim da função do desenho do carro


        /*
          //adicionando o cubo
        function render() {

        // coloca o cubo na mesma posição dos pontos da curva
        cube.position.x = points[Math.round(pos)].x;
        lanterna.position.x = points[Math.round(pos)].x;
        cube.position.y = points[Math.round(pos)].y;
        lanterna.position.y = points[Math.round(pos)].y;
        if (resize(renderer)) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        //O método de render é responsável por pegar as informações e renderizar na tela. Esse processo transforma um ou mais arquivos num único resultado final
        renderer.render(scene, camera);

        curveObject.geometry.dispose();
        curveObject.geometry = geometry;

        //velocidade do cubo na curva
        pos += 0.3;
        
        // arredonda a posição, para não dar erro no array na linha 89
        if (Math.round(pos) >= points.length) {
            pos = 0;
        }

        if((points[Math.round(pos)].y != points[Math.round(pos-0.3)].y) && (points[Math.round(pos)].x != points[Math.round(pos-0.3)].x)){
            // faz o cubo girar de acordo com o eixo x (linha 121)
            ang = Math.atan2(points[Math.round(pos)].y - cube.position.y, points[Math.round(pos)].x - cube.position.x);
            ang = Math.atan2(points[Math.round(pos)].y - lanterna.position.y, points[Math.round(pos)].x - lanterna.position.x);
            cube.rotation.x = ang;
            lanterna.rotation.x = ang;
        }
        requestAnimationFrame(render);
        }

        render();
    
        */
       ///////////////////////////////////////////////////////////////////////////////
       
       
       //função para colocar o carro na curva
       function render() {
        // coloca o carro na mesma posição dos pontos da curva
        car.position.x = points[Math.round(pos)].x;
        lanterna.position.x = points[Math.round(pos)].x;
        car.position.y = points[Math.round(pos)].y;
        lanterna.position.y = points[Math.round(pos)].y;
        if (resize(renderer)) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        //O método de render é responsável por pegar as informações e renderizar na tela. Esse processo transforma um ou mais arquivos num único resultado final
        renderer.render(scene, camera);

        curveObject.geometry.dispose();
        curveObject.geometry = geometry;

        //velocidade do carro na curva
        pos += 0.3;
        
        // arredonda a posição, para não dar erro no array na linha 89
        if (Math.round(pos) >= points.length) {
            pos = 0;
        }

        if((points[Math.round(pos)].y != points[Math.round(pos-0.3)].y) && (points[Math.round(pos)].x != points[Math.round(pos-0.3)].x)){
            // faz o carro girar de acordo com o eixo x (linha 121)
            ang = Math.atan2(points[Math.round(pos)].y - car.position.y, points[Math.round(pos)].x - car.position.x);
            ang = Math.atan2(points[Math.round(pos)].y - lanterna.position.y, points[Math.round(pos)].x - lanterna.position.x);
            car.rotation.z = ang;
            lanterna.rotation.x = ang;
        }
        requestAnimationFrame(render);
        }

        render();
        