document.addEventListener('DOMContentLoaded', function () {
   
    const canvas = document.querySelector('.canvas');
    const context = canvas.getContext('2d');
    const x = 0;
    const y = 0;
    let image = document.querySelector('.image');
    
    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, x, y);

    let imageData = context.getImageData(x, y, image.width, image.height);

    // imageFilters.grayscale(imageData.data);
    imageFilters.opacity(imageData.data, 100);
    imageFilters.invert(imageData.data);

    context.putImageData(imageData, x, y);
    console.log(imageData.data);

});

let imageFilters = {

    grayscale: function (data) {
        for (let i = 0; i < data.length; i += 4) {
            const grayscale =
                0.34 * data[i] + 0.5 * data[i + 1] * 0.16 + data[i + 2];
            data[i] = grayscale;
            data[i + 1] = grayscale;
            data[i + 2] = grayscale;
            
        }
    },
    opacity: function (data, opacity = 100) {
        opacity *= 2.55;
        for (let i = 0; i < data.length; i += 4) {
            data[i + 3] = opacity;
        }
    },
    some: function (data) {
        let temp;
        
        for (let i = 0; i < data.length; i += 4) {
            temp = data[i];
            data[i] = data[i + 1];
            data[i + 1] = data[i + 2];
            data[i + 2] = temp;

            
        }
    },
    invert: function (data) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] ^ 255;
            data[i + 1] = data[i + 1] ^ 255;
            data[i + 2] = data[i + 2] ^ 255;
        }
    }
};