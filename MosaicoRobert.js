var map = function( x,  in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
    
$(function () { 
    $canvas_imagen_original = $("#canvas_imagen_original");
    $canvas_imagen_grande = $("#canvas_imagen_grande");
    canvas_imagen_original = $canvas_imagen_original[0];
    canvas_imagen_grande = $canvas_imagen_grande[0];
    ctx = canvas_imagen_original.getContext("2d");
    ctx_grande = canvas_imagen_grande.getContext("2d");
    image = new Image();
    image.src = "imagen_original.jpg";
    
    btn_generar = $("#btn_generar");
    contenedor_baldosas = $("#contenedor_baldosas");
    plantilla_baldosa = $("#plantillas .baldosa");
    plantilla_pixel = $("#plantillas .pixel");
    capa_baldosas = $("#capa_baldosas");
    
    controles = $("#controles");
    
    escala = 1.5;
    $(image).load(function() {
        $canvas_imagen_original.attr("width", image.width);
        $canvas_imagen_original.attr("height", image.height);
        $canvas_imagen_grande.attr("width", image.width*escala);
        $canvas_imagen_grande.attr("height", image.height*escala);
        ctx.drawImage(image, 0, 0);
        ctx_grande.drawImage(image, 0, 0, image.width*escala, image.height*escala);
        pixeles_imagen = ctx.getImageData(0, 0, image.width, image.height).data;
        
        btn_generar.click(function(){
            controles.hide();
            size_baldosa = parseInt($("#size_baldosa").val());
            size_pixel = Math.floor(630/size_baldosa);
            cant_baldosas_h = Math.ceil(image.width/size_baldosa);
            cant_baldosas_v = Math.ceil(image.height/size_baldosa);
            
            capa_baldosas.empty();
            capa_baldosas.css("width", (cant_baldosas_h*size_baldosa*escala).toString()+"px");
            capa_baldosas.css("height", (cant_baldosas_v*size_baldosa*escala).toString()+"px");

            for(var ibv=0; ibv< cant_baldosas_v; ibv++){
                for(var ibh=0; ibh< cant_baldosas_h; ibh++){
                    var x_baldosa = size_baldosa*ibh;
                    var y_baldosa = size_baldosa*ibv;
                    var numero_baldosa = (cant_baldosas_h * ibv) + ibh;
                    
                    var baldosa = new Baldosa(x_baldosa, y_baldosa, numero_baldosa);                
                }
            }   
        });
    });
});

var Baldosa = function(x_baldosa, y_baldosa, numero_baldosa){
    var div_baldosa = plantilla_pixel.clone();
    div_baldosa.css("width", (size_baldosa*escala).toString()+"px");
    div_baldosa.css("height", (size_baldosa*escala).toString()+"px");    
    div_baldosa.css("left", (x_baldosa*escala).toString()+"px");
    div_baldosa.css("top", (y_baldosa*escala).toString()+"px");   
    div_baldosa.find("#lbl_color").text(numero_baldosa);      
    capa_baldosas.append(div_baldosa);                    
    
    div_baldosa.click(function(){
        var div_baldosa_grande = plantilla_baldosa.clone();
        div_baldosa_grande.find("#numero_baldosa").text(numero_baldosa);
                            
        for(var y_pixel=y_baldosa; y_pixel< y_baldosa + size_baldosa; y_pixel++){                            
            for(var x_pixel=x_baldosa; x_pixel< x_baldosa + size_baldosa; x_pixel++){                                    
                if((y_pixel<image.height) && (x_pixel<image.width)){                                    
                    var gris_del_pixel = pixeles_imagen[(y_pixel * (canvas_imagen_original.width * 4)) + (x_pixel * 4)];
                    var gris_del_pixel_mapeado = Math.round(map(gris_del_pixel, 0, 255, 1, 30));

                    var div_pixel = plantilla_pixel.clone();
                    
                    div_pixel.css("width", size_pixel.toString()+"px");
                    div_pixel.css("height", size_pixel.toString()+"px");
                    div_pixel.css("left", ((x_pixel-x_baldosa)*size_pixel).toString()+"px");
                    div_pixel.css("top", ((y_pixel-y_baldosa)*size_pixel).toString()+"px");
                    div_pixel.css("background-color", "rgb("+ gris_del_pixel +","+ gris_del_pixel +","+ gris_del_pixel +")");
                    div_pixel.find("#lbl_color").text(gris_del_pixel_mapeado);                
                    div_baldosa_grande.find("#contenedor_pixeles").append(div_pixel);
                }else{
                    var a="a";
                }
            }
        }
        contenedor_baldosas.append(div_baldosa_grande);
    });                    
    
    capa_baldosas.append(div_baldosa);     
};
//                var left_baldosa = 
//                div_baldosa.click(function(){
//                    var div_baldosa = plantilla_baldosa.clone();
//                    div_baldosa.find("#numero_baldosa").text(ibv*cant_baldosas_h + ibh);
//                                        
//                    for(var ipv=0; ipv< size_baldosa; ipv++){                            
//                        for(var iph=0; iph< size_baldosa; iph++){
//                            if((((ibv*size_baldosa) + ipv)<image.height) && (((ibh*size_baldosa) + iph)<image.width)){
//                                
//                                var gris_del_pixel = pixeles_imagen[((ibv*size_baldosa + ipv) * (canvas_imagen_original.width * 4)) + ((ibh*size_baldosa + iph) * 4)];
//                                var gris_del_pixel_mapeado = Math.round(map(gris_del_pixel, 0, 255, 1, 30));
//
//                                var div_pixel = plantilla_pixel.clone();
//                                
//                                div_pixel.css("width", Math.floor(630/size_baldosa).toString()+"px");
//                                div_pixel.css("height", Math.floor(630/size_baldosa).toString()+"px");
//                                div_pixel.css("background-color", "rgb("+ gris_del_pixel +","+ gris_del_pixel +","+ gris_del_pixel +")");
//                                div_pixel.find("#lbl_color").text(gris_del_pixel_mapeado);                
//                                div_baldosa.find("#contenedor_pixeles").append(div_pixel);
//                            }else{
//                                var a="a";
//                            }
//                        }
//                        div_baldosa.find("#contenedor_pixeles").append($("<br/>"));
//                    }
//                    cont_baldosas_tmp.append(div_baldosa);
//                })
//                capa_baldosas.append(div_baldosa);
//            }
//            
//            
//            
//            contenedor_baldosas.empty();
//            var cont_baldosas_tmp = $("<div>");
//            
//            for(var ibv=0; ibv< cant_baldosas_v; ibv++){
//            //for(var ibv=0; ibv< 1; ibv++){
//                for(var ibh=0; ibh< cant_baldosas_h; ibh++){
//                    var div_baldosa = plantilla_baldosa.clone();
//                    div_baldosa.find("#numero_baldosa").text(ibv*cant_baldosas_h + ibh);
//                                        
//                    for(var ipv=0; ipv< size_baldosa; ipv++){                            
//                        for(var iph=0; iph< size_baldosa; iph++){
//                            if((((ibv*size_baldosa) + ipv)<image.height) && (((ibh*size_baldosa) + iph)<image.width)){
//                                var gris_del_pixel = pixeles_imagen[((ibv*size_baldosa + ipv) * (canvas_imagen_original.width * 4)) + ((ibh*size_baldosa + iph) * 4)];
//                                var gris_del_pixel_mapeado = Math.round(map(gris_del_pixel, 0, 255, 1, 30));
//
//                                var div_pixel = plantilla_pixel.clone();
//                                
//                                div_pixel.css("width", Math.floor(630/size_baldosa).toString()+"px");
//                                div_pixel.css("height", Math.floor(630/size_baldosa).toString()+"px");
//                                div_pixel.css("background-color", "rgb("+ gris_del_pixel +","+ gris_del_pixel +","+ gris_del_pixel +")");
//                                div_pixel.find("#lbl_color").text(gris_del_pixel_mapeado);                
//                                div_baldosa.find("#contenedor_pixeles").append(div_pixel);
//                            }else{
//                                var a="a";
//                            }
//                        }
//                        div_baldosa.find("#contenedor_pixeles").append($("<br/>"));
//                    }
//                    cont_baldosas_tmp.append(div_baldosa);
//                }                  
//            }            
//
//              
//            contenedor_baldosas.append(cont_baldosas_tmp);
//        });  
//        