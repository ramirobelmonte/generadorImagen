const selecImagen = document.querySelector('#selecImage');
const precioImage = document.querySelector('#precioImage');
const btnGenerar = document.querySelector('#btnGenerar');
const btnCompartir = document.querySelector('#btnCompartir');
const btnDescargar = document.querySelector('#btnDescargar');
const canvas = document.querySelector('#postImage');

let imagen;
selecImagen.addEventListener('change',()=>{
    const imageUrl = selecImagen.value;

    imagen = new Image();
    imagen.src = imageUrl;

    imagen.addEventListener('load',()=>{
        actualizarImage(canvas, imagen, "");
    })

})

btnGenerar.addEventListener('click',()=>{
    actualizarImage(canvas, imagen, "$"+precioImage.value)

    const dataURL = canvas.toDataURL("image/png",1.0);
    btnDescargar.href = dataURL;
})
btnCompartir.addEventListener('click', async() => {
    try {
        await navigator.share(canvas.toDataURL("image/png",1.0))
    } catch (error) {
        console.log(error);
    }
})

function actualizarImage(canvas, image, precio) {
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    ctx.font = '80px Poppins';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center'
    ctx.textBaseLine = 'top'

    ctx.fillText(precio, width/2, 915);
}