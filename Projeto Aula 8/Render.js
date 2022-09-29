"use strict";

class Render {
    constructor(canvasID) {
        this.ang = 0;
        this.canvas = document.getElementById(canvasID);
        try {
            this.gl = this.canvas.getContext("webgl");
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        } catch (e) {
            var msg = "Error WebGL: " + e.toString();
            alert(msg);
            throw Error(msg);
        }

        if (!this.gl) {
            console.error("Erro ao iniciar o WebGL.");
            return;
        }
        var vertexShaderSource = document.getElementById("meu-vertex-shader").text;
        var fragmentShaderSource = document.getElementById("meu-fragment-shader").text;
        //Criamos os shader GLS:upload do GLS fonte e compilamos
        //console.log(vertexShaderSource);
        var vertexShader = Render.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
        //console.log(fragmentShaderSource);
        var fragmentShader = Render.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        //console.log("3");

        //ligamos os dois shaders em um programa
        this.programa = Render.createProgram(this.gl, vertexShader, fragmentShader);

        //procuramos a posição de memória dos dados de vértice
        this.positionAttributeLocation = this.gl.getAttribLocation(this.programa, "posicao");

        //criamos um buffer para inserir as coordenadas nele
        this.positionBuffer = this.gl.createBuffer();
        //Associamos o buffer criado a ARRAY_BUFFER
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        this.gl.useProgram(this.programa);
        //Recuperamos o local da variável Uniform chamada u_escala
        this.matrixLocation = this.gl.getUniformLocation(this.programa, "u_escala");

        this.matrixTransformLocation = this.gl.getUniformLocation(this.programa, "u_transforma");

        //Criamos a matriz que será multiplicada pelo vértices
        this.matriz = [this.canvas.height / this.canvas.width, 0, 0, 0,
                                                        0,     1, 0, 0,
                                                        0,     0, 1, 0,
                                                        0,     0, 0, 1
                                                    ];

                                        
                                                    
    }//Fim do construtor

   /* draw() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    */

    draw() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        //Escolhe qual programa utilizar
        this.gl.useProgram(this.programa);

        this.matrizTransforma = this.rotacionaZ(this.ang);
        this.ang += Math.PI / 180;

        this.gl.uniformMatrix4fv(this.matrixTransformLocation, false, this.matrizTransforma);

        //Realiza upload da matriz de transformação para u_escala
        this.gl.uniformMatrix4fv(this.matrixLocation, false, this.matriz);
        
        //var positions = [0, 0, 0, 0, 0.5, 0, 0.5, 0, 0,];

        var positions = [0, 0, 0, 0, 0.5, 0, 0.5, 0, 0,      //replicando outro triângulo para formar um retângulo
                            0,0.5,0, 0.5,0.5,0, 0.5,0,0.5 ];

        //Colocamos as coordenadas no buffer
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        //Ativa o atributo
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        //Associa ao position buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        //Explica como usar os dados do positionBuffer (ARRAY_BUFFER)
        var size = 3; //3 componentes por iteração
        var type = this.gl.FLOAT; //os dados são 32bit floats
        var normalize = false; //sem normalizar os dados
        var stride = 0; //0 = espaço entre dados(usado para representar cores, por exemplo) posição inicial do bufer

        var offset = 0;
        this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);

        //Desenhar
        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = 3; //6 para virar um quadrado
        this.gl.drawArrays(primitiveType, offset, count);


    } //Fim do método Draw

    //rotacionar no eixo x é não mexer no eixo x, assim por diante y e z

    //função que cria shader
    static createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);

    }

    static createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
    /*
        rotacionaX(ang) {
            var c = Math.cos(ang);
            var s = Math.sin(ang);
            return [
              1, 0, 0, 0,
              0, c, s, 0,
              0, -s, c, 0,
              0, 0, 0, 1
            ];
        }
    
        rotacionaY(ang) {
            var c = Math.cos(ang);
            var s = Math.sin(ang);
            return [
              c, 0, -s, 0,
              0, 1, 0, 0,
              s, 0, c, 0,
              0, 0, 0, 1
            ];
        }
    
        */

        rotacionaZ(ang) {
            var c = Math.cos(ang);
            var s = Math.sin(ang);
            return [
               c, -s, 0, 0,
              s, c, 0, 0,
               0, 0, 1, 0,
               0, 0, 0, 1
            ];
        }

}//Fim da classe render

