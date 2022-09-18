"use strict";

class Render{
    constructor(canvasID){
        this.canvas = document.getElementById(canvasID);
        try{
            this.gl = this.canvas.getContext("webgl");
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        
        }catch(e){
            var msg = "Error WebGL: " + e.toString();
            alert(msg);
            throw Error(msg);
        }

        if(!this.gl){
            console.error("Erro ao iniciar o WebGL.");
            return;
        }
 
    }//Fim do construtor

draw(){
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    //função que cria shader
static createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }
console.log(gl.getShaderInfolog(shader));
gl.deleteShader(shader);

}

static createProgram(gl, vertxShader, fragmentShader){
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}




}//Fim da classe render

