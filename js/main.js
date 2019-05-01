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
    // imageFilters.red(imageData.data);
    imageFilters.averageColor(imageData.data);

    context.putImageData(imageData, x, y);
    console.log(imageData.data);

});

let imageFilters = {

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

    some: function (data) {
        let temp;
        let avg;
        
        // for (let i = 0; i < data.length; i += 12) {
        //     avg = ((data[i] + data[i + 1] + data[i + 2]) + 
        //         (data[i + 4] + data[i + 5] + data[i + 6]) + 
        //         (data[i + 8] + data[i + 9] + data[i + 10])) / 9;
        //     data[i] = avg;
        //     data[i + 1] = avg;
        //     data[i + 2] = avg;
        //     data[i + 4] = avg;
        //     data[i + 5] = avg;
        //     data[i + 6] = avg;
        //     data[i + 8] = avg;
        //     data[i + 9] = avg;
        //     data[i + 10] = avg;
        // }
        for (let i = 0; i < data.length; i += 4) {
            avg = ((data[i] + data[i + 1] + data[i + 2]) + 
                (data[i + 4] + data[i + 5] + data[i + 6]) + 
                (data[i + 8] + data[i + 9] + data[i + 10])) / 9;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
            data[i + 4] = avg;
            data[i + 5] = avg;
            data[i + 6] = avg;
            data[i + 8] = avg;
            data[i + 9] = avg;
            data[i + 10] = avg;
        }
    },
    red: function (data) {
        for (let i = 0; i < data.length; i +=4 ) {
            data[i + 1] = 0;
            data[i + 2] = 0;
            
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
        console.log(temp);
        for (let i = 0; i < data.length; i += 4) {
            data[i] = temp[0];
            data[i + 1] = temp[1];
            data[i + 2] = temp[2];
            
        }
    }
};