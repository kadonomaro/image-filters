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
    // imageFilters.opacity(imageData.data, 100);
    // imageFilters.invert(imageData.data);
    // imageFilters.some(imageData.data);
    // imageFilters.averageColor(imageData.data);
    // imageFilters.contrast(imageData.data, 100);
    

    context.putImageData(imageData, x, y);
    console.log(imageData.data);
    canvas.style.filter = 'contrast(100%)';
    console.log(imageData.data);


});

let imageFilters = {
    contrast: function (data, contrast) {
        contrast = (contrast / 100) + 1;
        let intercept = 128 * (1 - contrast);
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] * contrast + intercept;
            data[i + 1] = data[i + 1] * contrast + intercept;
            data[i + 2] = data[i + 2] * contrast + intercept;
        }
    },

    grayscale: function (data) {
        let avg;
        for (let i = 0; i < data.length; i += 4) {
            avg = (data[i] + data[i + 1] + data[i + 2]) / 3 ;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
    },

    opacity: function (data, opacity = 100) {
        opacity *= 2.55;
        for (let i = 0; i < data.length; i += 4) {
            data[i + 3] = opacity;
        }
    },

    invert: function (data) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i] ^ 255;
            data[i + 1] = data[i + 1] ^ 255;
            data[i + 2] = data[i + 2] ^ 255;
        }
    },

    averageColor: function (data) {
        let temp = [0, 0, 0];

        for (let i = 0; i < data.length; i += 4) {
            temp[0] += data[i];
            temp[1] += data[i + 1];
            temp[2] += data[i + 2];
        }

        temp[0] /= (data.length / 4);
        temp[1] /= (data.length / 4);
        temp[2] /= (data.length / 4);

        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.floor(temp[0]);
            data[i + 1] = Math.floor(temp[1]);
            data[i + 2] = Math.floor(temp[2]);
        }
    },

};

