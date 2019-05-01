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

    imageFilters.grayscale(imageData.data);


    context.putImageData(imageData, x, y);

});

let imageFilters = {
    i: 0,
    red: this.i,
    green: this.i + 1,
    blue: this.i + 2,
    alpha: this.i + 3,
    grayscale: function (data) {
        for (let i = 0; i < data.length; i += 4) {
            const brightness =
                0.34 * data[i] + 0.5 * data[i + 1] * 0.16 + data[i + 2];
            data[i] = brightness;
            data[i + 1] = brightness;
            data[i + 2] = brightness;
        }
    }
};