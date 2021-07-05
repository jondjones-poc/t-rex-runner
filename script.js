document.addEventListener('DOMContentLoaded', () => {
    const trex = document.querySelector('.trex');
    const grid = document.querySelector('.grid');
    const alertEl = document.getElementById('alert');
    const body = document.querySelector('body');

    const JUMP_HEIGHT = 20;
    const MAX_SPAWN_TIME = 5000;
    const MIN_SPAWN_TIME = 2000;
    let GRAVITY = 0.9;
    let REFRESH_TIME = 20;
    let isJumping = false;
    let isGameOver = false;
    let position = 0;
    
    const generateObstacles = () => {
        let obstaclePosition = 1000;
        let randomTime = Math.floor(Math.random() * (MAX_SPAWN_TIME - MIN_SPAWN_TIME + 1)) + MIN_SPAWN_TIME;

        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle');
        obstacle.style.left = `${obstaclePosition}px`
        grid.appendChild(obstacle);

        let obstacleTimer = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition < 60  && position < 60) {
                clearInterval(obstacleTimer);
                alertEl.innerHTML = 'Game Over';
                isGameOver = true;

                while(grid.firstChild) {
                    grid.removeChild(grid.lastChild); 
                }
            };

            obstaclePosition -= 10;
            obstacle.style.left = `${obstaclePosition}px`;
        }, REFRESH_TIME);

  
       if (!isGameOver) {
            setTimeout(generateObstacles, randomTime); 
        }
    }

    const jump = () => {
        let count = 0;
        let jumpUpTimer = setInterval(() => {
     
            if (count === JUMP_HEIGHT) {
                clearInterval(jumpUpTimer);

                let jumpDownTimer = setInterval(() => {
                    if (count === 0) {
                        clearInterval(jumpDownTimer);
                        isJumping = false;
                        trex.style.bottom = `0px`;
                    } else {
                        position -= 5;
                        count--;
                        position = position * GRAVITY; 
                        trex.style.bottom = `${position}px`;
                    }
                });
            }


            position += 30;
            count++;
            position = position * GRAVITY; 
            trex.style.bottom = `${position}px`

        }, REFRESH_TIME);

    }
    const trexMovementHandler = (e) => {
        if(e.keyCode === 32) {
            isJumping = true;
            jump();
        }
    }
  
    document.addEventListener('keyup', trexMovementHandler);
    generateObstacles();
})