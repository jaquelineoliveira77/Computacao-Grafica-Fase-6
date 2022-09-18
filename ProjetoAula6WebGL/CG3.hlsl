sampler s0 : register(s0); //recebendo quadro atual da imagem inteira

///tex é a posição / 0 esquerdo - 1 direito
float4 main(float2 tex : TEXCOORD0) : COLOR {

    float4 rgb =tex2D(s0, tex);
    //if(rgb[0] < 0.5 && rgb[1] > 0.5 && rgb[2] < 0.5){
        if(1.1 * (rgb[0] + rgb[2]) - rgb[1] < 0){
        //cores vermelho, verde, azul, transparente
        rgb = float4(tex[1], 0, 0, 1);
    }

    return rgb;
}