sampler s0 : register(s0); //recebendo quadro atual da imagem inteira

float4 main(float2 tex : TEXCOORD0) : COLOR {

    float4 rgb =tex2D(s0, tex);
    float4 res = float4((rgb[0] + rgb[1] + rgb[2]) / 3,
                        (rgb[0] + rgb[1] + rgb[2]) / 3,
                        (rgb[0] + rgb[1] + rgb[2]) / 3, 1);

    return res;
}