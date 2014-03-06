var map = function( x,  in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
    
var dibujarBaldosas = function(baldosas){
    var size_baldosa = $("#size_baldosa").val();
    var contenedor_baldosas = $("#contenedor_baldosas");
    contenedor_baldosas.hide();
    for(var i=0; i< baldosas.length; i++){
        var div_baldosa = $("#plantillas .baldosa").clone();
        var baldosa = baldosas[i];
        for(var j=0; j<baldosa.length; j++){
            var div_pixel = $("#plantillas .pixel").clone();
            div_pixel.css("width", Math.round(div_baldosa.width/size_baldosa));
            div_pixel.css("height", Math.round(div_baldosa.height/size_baldosa));
            div_pixel.find("#lbl_color").text(baldosa[j]);                
            div_baldosa.append(div_pixel);
        }
        contenedor_baldosas.append(div_baldosa);
    }     
    contenedor_baldosas.show();
};
    
$(function () { 
    var $canvas_imagen_original = $("#canvas_imagen_original");
    var canvas_imagen_original = $canvas_imagen_original[0];
    var ctx = canvas_imagen_original.getContext("2d");
    var image = new Image();
    image.src = "imagen_original.jpg";
    
    var btn_generar = $("#btn_generar");
    
    $(image).load(function() {
        $canvas_imagen_original.attr("width", image.width);
        $canvas_imagen_original.attr("height", image.height);
        ctx.drawImage(image, 0, 0);
        var pixeles_imagen = ctx.getImageData(0, 0, canvas_imagen_original.width, canvas_imagen_original.height).data;
        btn_generar.click(function(){
            var size_baldosa = $("#size_baldosa").val();
            var cant_baldosas_h = Math.ceil(image.width/size_baldosa);
            var cant_baldosas_v = Math.ceil(image.height/size_baldosa);
            var baldosas = [];
            
            for(var ibh=0; ibh< cant_baldosas_h; ibh++){
                for(var ibv=0; ibv< cant_baldosas_v; ibv++){
                    var baldosa = [];
                    for(var iph=0; iph< size_baldosa; iph++){
                        for(var ipv=0; ipv< size_baldosa; ipv++){                            
                            var rojo_del_pixel = pixeles_imagen[((ibv*size_baldosa + ipv) * (canvas_imagen_original.width * 4)) + ((ibh*size_baldosa + iph) * 4)];
                            baldosa.push(Math.round(map(rojo_del_pixel, 0, 255, 1, 30)));
                        }
                    }
                    baldosas.push(baldosa);
                }                  
            }            
            dibujarBaldosas(baldosas);
        });  
        
    });
});