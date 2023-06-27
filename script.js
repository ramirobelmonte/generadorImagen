function renderizarImagen(canvas, bgUrl, productoUrl, productoE, nombre, nombreE, precio, precioE) {
    return new Promise((resolve, reject) => {

        const ctx = canvas.getContext('2d');

        // Cargamos el background
        const background = new Image();
        background.onload = () => {
            //Dimensiones
            canvas.width = background.width;
            canvas.height = background.height;
            // Renderizar la imagen en el canvas
            ctx.drawImage(background, 0, 0);

            //Cargamos el producto
            const producto = new Image();
            producto.onload = () => {
                ctx.shadowColor = "rgba(0,0,0,0.5)";
                ctx.shadowBlur = 100;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0
                ctx.drawImage(producto, productoE[0], productoE[1]);

                ctx.font = '90px Poppins';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.fillText(nombre, nombreE[0], nombreE[1]);
                ctx.fillText(precio, precioE[0], precioE[1]);

                // Resolver la promesa
                resolve();
            }
            producto.onerror = () => {
                // Rechazar la promesa si ocurre un error al cargar la imagen
                reject(new Error('Error al cargar la imagen'));
            };

            producto.src = productoUrl;

        };
        background.onerror = () => {
            // Rechazar la promesa si ocurre un error al cargar la imagen
            reject(new Error('Error al cargar la imagen'));
        };

        background.src = bgUrl;
    });
}

let nombre;
let precio;

btnGenerar.addEventListener("click", () => {
    // Obtener el canvas
    const canvas = postImage;
    // URL de la imagen a cargar
    const bgUrl = selectImage.value;
    const productoUrl = corteCarne.value;
    nombre = corteCarne.selectedOptions[0].text.toUpperCase();
    precio = "$" + precioImage.value;
    let productoE = [0, 0];
    let nombreE = [0, 0];
    let precioE = [0, 0];

    if (selectImage.selectedIndex == 3) {
        productoE = [0, 600];
        nombreE = [540, 1500];
        precioE = [540, 1625];
    }
    else if (selectImage.selectedIndex == 2) {
        productoE = [-300, -200];
        nombreE = [500, 700];
        precioE = [500, 820];
    }
    else if (selectImage.selectedIndex == 1) {
        productoE = [837, 0];
        nombreE = [1330, 200];
        precioE = [1330, 910];
    }

    // Llamar a la función para renderizar la imagen y esperar a que se complete
    renderizarImagen(canvas, bgUrl, productoUrl, productoE, nombre, nombreE, precio, precioE)
        .then(() => {
            console.log('Imagen renderizada con éxito');
            btnDescargar.removeAttribute('disabled');
            // Aquí puedes realizar acciones adicionales después de que la imagen se haya renderizado correctamente
        })
        .catch((error) => {
            console.error('Ocurrió un error al renderizar la imagen:', error);
            // Aquí puedes manejar cualquier error que ocurra durante el proceso de renderizado
        });
})

btnDescargar.addEventListener('click', () => {
    // Exporta el lienzo a una imagen en base64
    var dataURL = postImage.toDataURL({
      format: 'jpeg',
      quality: 0.8
    });
  
    // Crea un enlace para descargar la imagen
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = `${nombre}-${precio}.jpg`;
    link.click();
});