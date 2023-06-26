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
        new enemyTemplate({id: 'enemy1', x: 100, y: -20, width: 50, height: 30}),
        new enemyTemplate({id: 'enemy2', x: 225, y: -20, width: 50, height: 30}),
        new enemyTemplate({id: 'enemy3', x: 350, y: -20, width: 80, height: 30}),
        new enemyTemplate({id: 'enemy4', x: 100, y: -70, width: 80, height: 30}),
        new enemyTemplate({id: 'enemy5', x: 225, y: -70, width: 50, height: 30}),
        new enemyTemplate({id: 'enemy6', x: 350, y: -70, width: 50, height: 30}),
        new enemyTemplate({id: 'enemy7', x: 475, y: -70, width: 50, height: 30}),
        new enemyTemplate({id: 'enemy8', x: 600, y: -70, width: 80, height: 30}),
        new enemyTemplate({id: 'enemy9', x: 475, y: -20, width: 50, height: 30}),
        new enemyTemplate({id: 'enemy10', x: 600, y: -20, width: 50, height: 30}),

        // Grupo 2
        new enemyTemplate({id: 'enemy11', x: 100, y: -220, width: 50, height: 30, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy12', x: 225, y: -220, width: 50, height: 30, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy13', x: 350, y: -220, width: 80, height: 50, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy14', x: 100, y: -270, width: 80, height: 50, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy15', x: 225, y: -270, width: 50, height: 30, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy16', x: 350, y: -270, width: 50, height: 30, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy17', x: 475, y: -270, width: 50, height: 30, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy18', x: 600, y: -270, width: 80, height: 50, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy19', x: 475, y: -220, width: 50, height: 30, image: enemiesPic2}),
        new enemyTemplate({id: 'enemy20', x: 600, y: -220, width: 50, height: 50, image: enemiesPic2}),
    ];

    function renderEnemies(enemyList){
        for(let i = 0; i < enemyList.length; i++){
            let enemy = enemyList[i];
            ctx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.width, enemy.height);
            launcher.hitDetectLowerLevel(enemy);
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

        this.gameStatus = {
            over: false,
            message: '',
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif'
        }

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

            if(enemies.length === 0){
                clearInterval(animateInterval);
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('You Win! Press P to restart', canvasWidth*.5 - 125, 50);
            }
        };

        this.hitDetect = function(misil, misili){
            for(let i = 0; i < enemies.length; i++){
                let e = enemies[i];

                if(misil.x <= e.x + e.width && misil.x + misil.width >= e.x && misil.y >= e.y && misil.y <= e.y + e.height){
                    enemies.splice(i, 1);
                    document.querySelector('.barra').innerHTML = 'Destroyed ' + e.id
                }
            }
        }

        this.hitDetectLowerLevel = function (enemy){
            if(enemy.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'You lose! Press P to restart';
            };

            if((enemy.y < this.y + 25 && enemy.y > this.y - 25) && (enemy.x < this.x + 45 && enemy.x > this.x - 45)){
                this.gameStatus.over = true;
                this.gameStatus.message = 'You died! Press P to restart';
            }

            if(this.gameStatus.over === true){
                clearInterval(animateInterval);
                ctx.fillStyle = this.gameStatus.fillStyle;
                ctx.font = this.gameStatus.font;

                ctx.fillText(this.gameStatus.message, canvasWidth*.5 - 130, 50);
            };
        };

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
    
    fire_btn.addEventListener('mousedown', function(event){
        launcher.misiles.push({
            x: launcher.x + launcher.width * .5,
            y: launcher.y,
            width: 3,
            height: 10
        })
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
