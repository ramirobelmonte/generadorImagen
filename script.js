let background = new Image()
background.src = 'src/bg.png'
let imagen;
let posicionY;


function generarImagen(canvas, background, corte, precio, producto) {

    //rederizo el lienzo base
    const ctx = canvas.getContext("2d");
    //renderizo el texto
    const ctx_producto = canvas.getContext("2d");
    const ctx_precio = canvas.getContext("2d");
    const ctx_corte = canvas.getContext("2d");
    //parametros de dimensiones
    const width = background.width;
    const height = background.height;
    //asigno los parametros
    canvas.width = width;
    canvas.height = height;
    //renderizo
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(corte, 850, 0);
    //estilo del texto
    ctx_precio.font = '100px Poppins';
    ctx_precio.fillStyle = 'black';
    ctx_precio.textAlign = 'left';
    ctx_precio.textBaseLine = 'middle';
    ctx_precio.fillText('$'+precio, width-730, height-150);

    ctx_producto.font = '100px Poppins';
    ctx_producto.fillStyle = 'orange';
    ctx_producto.textAlign = 'center'
    ctx_producto.textBaseLine = 'middle';        
    ctx_producto.fillText(producto, width-550, height/4.5);
    
}

window.addEventListener('load', function () {
    //reinicio el formulario
    formulario.reset()
    nameCarne.classList.add('hidden')
    nameProduct.classList.add('hidden')
    precio.classList.add('hidden')
    
    selectImage.addEventListener('change',(e)=>{   

        nameCarne.classList.add('hidden')
        nameProduct.classList.add('hidden')

        let valor = e.target.selectedIndex

        if(valor == 1){
            nameCarne.classList.remove('hidden')
            precio.classList.remove('hidden')

            corteCarne.addEventListener('change',(e)=>{
                let src = e.target.value
                let corte = e.target.selectedOptions[0].text.toUpperCase()
                imagen = new Image()
                imagen.src = src

                imagen.addEventListener('load',()=>{
                    generarImagen(postImage, background, imagen, precioImage.value, corte)
                    btnGenerar.classList.remove('disable')
                })
                
                btnGenerar.addEventListener('click',()=>{
                    generarImagen(postImage, background, imagen, precioImage.value, corte)

                    btnDescargar.download = corte+'.jpeg'
                    btnDescargar.href = postImage.toDataURL("image/jpeg",1);

                    formulario.reset()
                    btnDescargar.classList.remove('hidden')

                })
    
            })
        }
        else if(valor == 2){
            console.log('chau')
        }
        else{
            formulario.reset()
        }
    })
})
