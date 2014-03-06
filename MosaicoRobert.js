var map = function( x,  in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
    
$(function () { 
    var $canvas_imagen_original = $("#canvas_imagen_original");
    var $canvas_imagen_grande = $("#canvas_imagen_grande");
    var canvas_imagen_original = $canvas_imagen_original[0];
    var canvas_imagen_grande = $canvas_imagen_grande[0];
    var ctx = canvas_imagen_original.getContext("2d");
    var ctx_grande = canvas_imagen_grande.getContext("2d");
    var image = new Image();
    image.src = "imagen_original.jpg";
    
    var btn_generar = $("#btn_generar");
    var contenedor_baldosas = $("#contenedor_baldosas");
    var plantilla_baldosa = $("#plantillas .baldosa");
    var plantilla_pixel = $("#plantillas .pixel");
    var capa_baldosas = $("#capa_baldosas");
    
    $(image).load(function() {
        $canvas_imagen_original.attr("width", image.width);
        $canvas_imagen_original.attr("height", image.height);
        $canvas_imagen_grande.attr("width", image.width*2);
        $canvas_imagen_grande.attr("height", image.height*2);
        ctx.drawImage(image, 0, 0);
        ctx_grande.drawImage(image, 0, 0, image.width*2, image.height*2);
        var pixeles_imagen = ctx.getImageData(0, 0, image.width, image.height).data;
        btn_generar.click(function(){
            var size_baldosa = $("#size_baldosa").val();
            var cant_baldosas_h = Math.ceil(image.width/size_baldosa);
            var cant_baldosas_v = Math.ceil(image.height/size_baldosa);
            var baldosas = [];
            
            for(var ibv=0; ibv< cant_baldosas_v; ibv++){
                for(var ibh=0; ibh< cant_baldosas_h; ibh++){
                    var baldosa = [];
                    for(var ipv=0; ipv< size_baldosa; ipv++){                            
                        for(var iph=0; iph< size_baldosa; iph++){
                            var rojo_del_pixel = pixeles_imagen[((ibv*size_baldosa + ipv) * (canvas_imagen_original.width * 4)) + ((ibh*size_baldosa + iph) * 4)];
                            baldosa.push(Math.round(map(rojo_del_pixel, 0, 255, 1, 30)));
                        }
                    }
                    baldosas.push(baldosa);
                }                  
            }            

            capa_baldosas.empty();
            capa_baldosas.css("width", (cant_baldosas_h*size_baldosa*2).toString()+"px");
            capa_baldosas.css("height", (cant_baldosas_v*size_baldosa*2).toString()+"px");

            for(var i=0; i< baldosas.length; i++){
                var div_baldosa = plantilla_pixel.clone();
                div_baldosa.css("width", (size_baldosa*2).toString()+"px");
                div_baldosa.css("height", (size_baldosa*2).toString()+"px");
                div_baldosa.find("#lbl_color").text(i);                
                capa_baldosas.append(div_baldosa);
            }
            
            contenedor_baldosas.empty();
            var cont_baldosas_tmp = $("<div>");
            //for(var i=0; i< baldosas.length; i++){
            for(var i=500; i< 600; i++){ //debug sacar
                var div_baldosa = plantilla_baldosa.clone();
                div_baldosa.find("#numero_baldosa").text(i);
                var baldosa = baldosas[i];
                for(var j=0; j<baldosa.length; j++){
                    var div_pixel = plantilla_pixel.clone();
                    var gris = Math.round(map(baldosa[j], 1, 30, 0, 255));
                    div_pixel.css("width", Math.floor(600/size_baldosa).toString()+"px");
                    div_pixel.css("height", Math.floor(600/size_baldosa).toString()+"px");
                    div_pixel.css("background-color", "rgb("+ gris +","+ gris +","+ gris +")");
                    div_pixel.find("#lbl_color").text(baldosa[j]);                
                    div_baldosa.find("#contenedor_pixeles").append(div_pixel);
                }
                cont_baldosas_tmp.append(div_baldosa);
            }     
            contenedor_baldosas.append(cont_baldosas_tmp);
        });  
        
    });
});