///////////// donnisaur game /////////////
function playDonnisaur() {
    const $donniRex = $('#donniRex');
    const donniarea = document.querySelector('.donniarea');
    const over = $('#over');
    const $taco = $('#taco');
    const $points = $('.points');
    const $body = $('body');
    const $weather = $('#weather');
    const $weatherSection = $('#weatherSection')
    let isJumping = false;
    let isMoving = false;
    let backdown = .9;
    let gameOver = false;

    document.getElementById('donniRex').onclick = function(e){
        console.log('pressed');
        $('#titlesaur').addClass('d-none');
        $('#clickDon').addClass('d-none');
        $('#titlesaur').removeClass('d-inline-block');
        // if (e.keyCode == 32 && isMoving){
        if (isMoving){
            if (!isJumping) {
                isJumping = true;
                console.log('pressed');
                jump();
            }
        } else {
            if (!isMoving) {
                over.addClass('d-none');
                isMoving = true;
                makeHurdles();
            }
        }
    }

    let donniPosition = 0;
    function jump() {
        let count = 0;
        let upTimer = setInterval(function() {
            //come back down after count = 15
            if (count === 15) {
                clearInterval(upTimer);
                let downsetTimer = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downsetTimer);
                        isJumping = false;
                    }
                    donniPosition -= 7;
                    count --;
                    donniPosition = donniPosition * backdown;
                    $donniRex.css({bottom: donniPosition + 'px'});
                // how fast should donni move down
                }, 30)
            }
            donniPosition += 35;
            count++;
            donniPosition = donniPosition * backdown;
            $donniRex.css({bottom: donniPosition + 'px'});
        // how fast should donni move up
        }, 10)
    }

    let score = 0; //start score at 0
    function makeHurdles() {
        // generate hurdle divs randomly
        let randoTime = Math.random() * 9000;
        let hurdlePosition = 1600; //way over to the right
        let hurdle = document.createElement('div');
        if (!gameOver) {
            // add class that contains the hurdle image while game is still going
            hurdle.classList.add('hurdle');
        }
        donniarea.appendChild(hurdle);
        hurdle.style.left = hurdlePosition + 'px';
        // console.log('hurdle pos: ' + hurdlePosition + ' dondon pos: ' + donniPosition);

        let setTimer = setInterval(function() {
            // if donni and hurdle are in the same place at same time, end game
            if (hurdlePosition > 0 && hurdlePosition < 60 && donniPosition < 60) {
                clearInterval(setTimer);
                over.html('Game Over');
                over.removeClass('d-none');
                over.addClass('over');
                $weatherSection.addClass('d-none');
                $playagainButton.removeClass('d-none');
                $playagainButton.addClass('d-block');
                gameOver = true;
                // everything disappears at gameover
                while (donniarea.firstChild) {
                    donniarea.removeChild(donniarea.lastChild);
                }
            // keep score - if hurdle comes and donni doesnt touch it, add points
            } else if (hurdlePosition > 0 && hurdlePosition < 60 && donniPosition > 60) {
                score++;
                $taco.html(`<img class="tacos" src="img/taco.png">`);
                $points.html(`<h4 class="outline pink">Score:<span class="green"> ${score}</span</h4><img class="taco-score" src="img/taco.png">`)
                $('#taco img').fadeTo("slow", 0.0);
            }
            // increase this number to speed up hurdles
            hurdlePosition -= 5;
            hurdle.style.left = hurdlePosition + 'px';
        }, 20)  

        // change background based on weather. default to 'Clear' if value missing
        var skyColor;
        var skyImage;
        if (!gameOver) {
            // myWeather = 'Rain';
            switch(myWeather) {
                case 'Clouds':
                    skyColor = 'blue';
                    skyImage = 'weather-clouds';
                    break;
                case 'Rain':
                    skyColor = 'gray';
                    skyImage = 'weather-rain';
                    break;
                case 'Snow':
                    skyColor = 'white';
                    skyImage = 'weather-snow';
                    break;
                default:
                    skyColor = 'lightBlue';
                    skyImage = 'weather-clear';
            }
            setTimeout(makeHurdles, randoTime);
        }
        // console.log(myWeather);
        $body.css('background-color', `${skyColor}`);
        $weather.addClass(`${skyImage}`);
    }
}

