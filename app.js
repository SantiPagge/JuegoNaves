function initCanvas(){
    let ctx = document.getElementById('my_canvas').getContext('2d');
    let backgroundImage = new Image();
    let naveImage = new Image();
    let enemiesPic1 = new Image();
    let enemiesPic2 = new Image();

    backgroundImage.src = '../JuegoNaves/images/background-pic.jpg'
    naveImage.src = '../JuegoNaves/images/spaceship-pic.png'
    enemiesPic1.src = '../JuegoNaves/images/enemigo1.png'
    enemiesPic2.src = '../JuegoNaves/images/enemigo2.png'

    let canvasWidth = ctx.canvas.width;
    let canvasHeight = ctx.canvas.height;

    const enemyTemplate = (options) => {
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            width: options.width || '',
            heigth: options.heigth || '',
            image: options.image || enemiesPic1,
        }
    }
    
    let enemies = [
        new enemyTemplate({id: 'enemy3', x: 350, y: 50, width: 80, height: 30})
    ];

    const renderEnemies = (enemyList) => {
        for(let i = 0; i < enemyList.length; i++){
            let enemy = enemyList[i]
            ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.heigth)
        }
    }

};

window.addEventListener('load', function(event) {
    initCanvas();
});
