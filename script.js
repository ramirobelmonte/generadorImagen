const selecImagen = document.querySelector('#selecImage');
const precioImage = document.querySelector('#precioImage');
const btnGenerar = document.querySelector('#btnGenerar');
const btnCompartir = document.querySelector('#btnCompartir');
const btnDescargar = document.querySelector('#btnDescargar');
const btnprint = document.querySelector('#btnprint');
const formulario = document.querySelector('#formulario');
const nombre_producto = document.querySelector('#nombre_producto');
const contenedor_producto = document.querySelector('#Cproducto');
const canvas = document.querySelector('#postImage');

let imagen;
let posicionY;
let producto = false;



function actualizarImage(canvas, image, precio, y, boolean) {
    const ctx = canvas.getContext("2d");
    const ctx_producto = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(image, 0, 0);
    ctx_producto.drawImage(image, 0, 0);
    
    ctx.font = '80px Poppins';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center'
    ctx.textBaseLine = 'middle'
    
    
    ctx.fillText(precio, width/2, y);
    
    if (boolean) {
        ctx_producto.font = '80px Poppins';
        ctx_producto.fillStyle = 'orange';
        ctx_producto.textAlign = 'center'
        ctx_producto.textBaseLine = 'middle'
        
        ctx_producto.fillText(nombre_producto.value, width/2, y-140);
    }
    
}

window.addEventListener('load', function () {
    
    selecImagen.addEventListener('change',()=>{
        const imageUrl = selecImagen.value;
        
        if (selecImagen.value == 'src/Pantilla_A4.png') {
            posicionY = 540+80;
            producto = true;
            contenedor_producto.classList.remove('hidden');
            
        }else{
            posicionY = 915;
            producto = false;
            contenedor_producto.classList.add('hidden');
        }

        imagen = new Image();
        imagen.src = imageUrl;
    
        imagen.addEventListener('load',()=>{
            actualizarImage(canvas, imagen, "", 0, producto);
        })
        btnGenerar.classList.remove('disable');
        btnDescargar.classList.add('hidden');
    })
    
    btnGenerar.addEventListener('click',()=>{
        actualizarImage(canvas, imagen, "$"+precioImage.value, posicionY, producto)
    
        const dataURL = canvas.toDataURL("image/jpeg",1);
        btnDescargar.href = dataURL;

        formulario.reset();
        btnDescargar.classList.remove('hidden');

    })

})


