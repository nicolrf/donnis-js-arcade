////// donnisaur game ///////////
function playDonnisaur() {
    const $dino = $('#dino');
    const grid = document.querySelector('.grid');
    const $gameOverText = $('#over');
    let isJumping = false;
    let isMoving = false;
    let backdown = .9;
    let gameOver = false;

    // press space to make hurdles start moving, then for donnisaur to jump
    document.body.onkeyup = function(e){
        $('.press-space').addClass('d-none');
        if (e.keyCode == 32 && isMoving){
            if (!isJumping) {
                isJumping = true;
                // console.log('pressed');
                jump();
            }
        } else {
            if (!isMoving) {
                isMoving = true;
                // console.log('moving');
                makeHurdles();
            }
        }
    }

    let donniPosition = 0;
    function jump() {
        // console.log('jump');
        let count = 0;
        let upTimer = setInterval(function() {
            //come back down after count = 15
            if (count === 15) {
                clearInterval(upTimer);
                // console.log('down');
                let downsetTimer = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downsetTimer);
                        isJumping = false;
                    }
                    donniPosition -= 5;
                    count --;
                    donniPosition = donniPosition * backdown;
                    $dino.css({bottom: donniPosition + 'px'});
                // how fast should donni move down
                }, 30)
            }
            // console.log('up')
            donniPosition += 30
            count++;
            donniPosition = donniPosition * backdown;
            $dino.css({bottom: donniPosition + 'px'});
        // how fast should donni move up
        }, 10)
    }

    let score = 0; //start score at 0
    function makeHurdles() {
        // generate hurdle divs randomly
        let randoTime = Math.random() * 9000;
        let hurdlePosition = 1800; //way over to the right
        let hurdle = document.createElement('div');
        if (!gameOver) {
            // add class that contains the hurdle image while game is still going
            hurdle.classList.add('hurdle');
        }
        grid.appendChild(hurdle);
        hurdle.style.left = hurdlePosition + 'px';
        // console.log('hurdle pos: ' + hurdlePosition + ' dino pos: ' + donniPosition);

        let setTimer = setInterval(function() {
            // if donni and hurdle are in the same place at same time, end game
            if (hurdlePosition > 0 && hurdlePosition < 60 && donniPosition < 60) {
                clearInterval(setTimer);
                $gameOverText.html('Game Over');
                gameOver = true;
                // everything disappears at gameover
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            // keep score - if hurdle comes and donni doesnt touch it, add points
            } else if (hurdlePosition > 0 && hurdlePosition < 60 && donniPosition > 60) {
                score++;
                // console.log('point' + score);
                $('#taco').html(`<img class="tacos" src="img/taco.png">`)
                $('.points').html(`<h4 class="outline pink">Score:<span class="green"> ${score}</span</h4><img class="taco-score" src="img/taco.png"> `)
                $('#taco img').fadeTo("slow", 0.0);
            }
            // increase this number to speed up hurdles
            hurdlePosition -= 5;
            hurdle.style.left = hurdlePosition + 'px';
        }, 20)  

        // change background based on weather. default to 'Clear' if value missing
        if (!gameOver) {
            // myWeather = 'Clouds';
            if (myWeather == 'Clouds') {
                $('body').css('background-color', 'blue');
                $('#weather').addClass('weather-clouds');
            } else if (myWeather == 'Rain') {
                $('body').css('background-color', 'gray');
                $('#weather').addClass('weather-rain');
            } else if (myWeather == 'Snow') {
                $('body').css('background-color', 'white');
                $('#weather').addClass('weather-snow');
            } else {
                $('body ').css('background-color', 'lightBlue');
                $('#weather').addClass('weather-clear');
            }
            setTimeout(makeHurdles, randoTime);
        }
        
    }
}