function initCanvas(){
    let ctx = document.getElementById('my_canvas').getContext('2d');
    let backgroundImage = new Image();
    let naveImage = new Image();
    let enemiesPic1 = new Image();
    let enemiesPic2 = new Image();

    backgroundImage.src = 'images/background-pic.jpg'
    naveImage.src = 'images/spaceship-pic.png'
    enemiesPic1.src = 'images/enemigo1.png'
    enemiesPic2.src = 'images/enemigo2.png'

    let canvasWidth = ctx.canvas.width;
    let canvasHeight = ctx.canvas.height;

    function enemyTemplate(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            width: options.width || '',
            height: options.height || '',
            image: options.image || enemiesPic1,
        }
    }
    
    let enemies = [
        new enemyTemplate({id: 'enemy3', x: 350, y: 50, width: 80, height: 30})
    ];

    function renderEnemies(enemyList){
        for(let i = 0; i < enemyList.length; i++){
            let enemy = enemyList[i]
            ctx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.width, enemy.height)
        }
    }

    function Launcher(){
        this.y = 500,
        this.x = canvasWidth*.5 - 25,
        this.width = 100,
        this.height = 100.
        this.direction,
        this.bg = 'white',
        this.misiles = [];

        this.render = function(){
            ctx.fillStyle = this.bg
            ctx.drawImage(backgroundImage, 10, 10)
            ctx.drawImage(naveImage, this.x, this.y, 100, 90)
        }
    }

    let launcher = new Launcher();

    function animate(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        launcher.render();
        renderEnemies(enemies);
    }

    let animateInterval = setInterval(animate, 6)

};

window.addEventListener('load', function(event) {
    initCanvas();
});
