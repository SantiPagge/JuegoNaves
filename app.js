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
            if(this.direction === 'left'){
                this.x -= 5;
            } else if(this.direction === 'right'){
                this.x += 5;
            } else if(this.direction === 'downArrow'){
                this.y += 5;
            } else if(this.direction === 'upArrow'){
                this.y -= 5;
            };
            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10);
            ctx.drawImage(naveImage, this.x, this.y, 100, 90);

            for(let i = 0; i < this.misiles.length; i++){
                let misil = this.misiles[i];
                ctx.fillRect(misil.x, misil.y -= 5, misil.width, misil.height);
                this.hitDetect(misil, i);
                if(misil.y <= 0){
                    this.misiles.splice(i, 1);
                }
            }
        }

        this.hitDetect = function(misil, misili){
            for(let i = 0; i < enemies.length; i++){
                let e = enemies[i];

                if(misil.x <= e.x + e.width && misil.x + misil.width >= e.x && misil.y >= e.y && misil.y <= e.y + e.height){
                    enemies.splice(i, 1);
                    document.querySelector('.barra').innerHTML = 'Destroyed ' + e.id
                }
            }
        }

    };

    let launcher = new Launcher();

    function animate(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        launcher.render();
        renderEnemies(enemies);
    }

    let animateInterval = setInterval(animate, 6);

    let left_btn = document.getElementById('left_btn')
    let right_btn = document.getElementById('right_btn')
    let fire_btn = document.getElementById('fire_btn')

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 37){
            launcher.direction = 'left';
            if(launcher.x < canvasWidth*.2 - 130){
                launcher.x += 0;
                launcher.direction = '';
            }
        } 
    });

    document.addEventListener('keyup', function(event){
        if(event.keyCode === 37){
            launcher.x += 0;
            launcher.direction = '';
        } 
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 39){
            launcher.direction = 'right';
            if(launcher.x > canvasWidth - 110){
                launcher.x -= 0;
                launcher.direction = '';
            }
        } 
    });

    document.addEventListener('keyup', function(event){
        if(event.keyCode === 39){
            launcher.x -= 0;
            launcher.direction = '';
        } 
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 38){
            launcher.direction = 'upArrow';
            if(launcher.y < canvasHeight*.2 - 80){
                launcher.y += 0;
                launcher.direction = '';
            }
        } 
    });

    document.addEventListener('keyup', function(event){
        if(event.keyCode === 38){
            launcher.y -= 0;
            launcher.direction = '';
        } 
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 40){
            launcher.direction = 'downArrow';
            if(launcher.y > canvasHeight - 110){
                launcher.y -= 0;
                launcher.direction = '';
            }
        } 
    });

    document.addEventListener('keyup', function(event){
        if(event.keyCode === 40){
            launcher.y += 0;
            launcher.direction = '';
        } 
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 80){
            location.reload();
        } 
    });

    left_btn.addEventListener('mousedown', function(event){
        launcher.direction = 'left';
    });

    left_btn.addEventListener('mouseup', function(event){
        launcher.direction = '';
    });

    right_btn.addEventListener('mousedown', function(event){
        launcher.direction = 'right';
    });

    right_btn.addEventListener('mouseup', function(event){
        launcher.direction = '';
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 32){
            launcher.misiles.push({
                x: launcher.x + launcher.width * .5,
                y: launcher.y,
                width: 3,
                height: 10
            })
        }
    });

    document.addEventListener('keyup', function(event){
        if(event.keyCode === 40){
            launcher.y += 0;
            launcher.direction = '';
        } 
    });
    
};

window.addEventListener('load', function(event) {
    initCanvas();
});
