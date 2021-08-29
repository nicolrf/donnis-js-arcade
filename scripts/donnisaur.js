///////////// donnisaur game /////////////
function playDonnisaur() {
    const $donniRex = $('#donniRex');
    const $donniarea = $('.donniarea');
    const donniarea = document.querySelector('.donniarea');
    const body = document.querySelector('body');
    const isOver = $('#over');
    let hasStarted = false;
    let backdown = .9;
    let gameOver = false;

    // default background (sans weather api)
    $('body').css('background-color', 'lightBlue');
    $('#weather').addClass('weather-clear');

    //click donni to start and to jump
    $donniRex.on('click', function() {
        $('#titlesaur').addClass('d-none');
        $('#clickDon').addClass('d-none');
        $('#titlesaur').removeClass('d-inline-block');
        // if first click, start hurdles
        if (hasStarted){
            console.log('clicked jump');
            donniJump();
        } else {
            hasStarted = true;
            donniJump();
            makeHurdles();
        }
    });
    // jump Donni
    let donniPosition = 0;
    function donniJump() {
        let counter = 0;
        let goingUp = setInterval(function() {
            //come back down when count = 5
            if (counter === 5) {
                clearInterval(goingUp);
                let comingDown = setInterval(function() {
                    if (counter === 0) {
                        clearInterval(comingDown);
                    }
                    donniPosition -= 28;
                    counter --;
                    console.log(counter);
                    donniPosition *= backdown;
                    $donniRex.css({bottom: donniPosition + 'px'})
                // how fast should donni come down
                }, 50)
            }
            donniPosition += 60;
            counter ++;
            console.log(counter);
            donniPosition *= backdown;
            $donniRex.css({bottom: donniPosition + 'px'})
        // how fast should donni go up
        }, 40)
    }
    // keep score
    let score = 0; 
    function makeHurdles(){
        console.log('making hurdle')
        // generate hurdle divs randomly
        let randoTime = Math.random() * 5000;
        let hurdlePosition = 1000; //way over to the right
        let hurdle = document.createElement('div');
        if (!gameOver) {
            // add class that contains the hurdle image while game is still going
            hurdle.classList.add('hurdle');
            donniarea.appendChild(hurdle);
            hurdle.style.left = hurdlePosition + 'px';
            console.log(hurdlePosition);
        }
        let hurdleTimer = setInterval(function() {
            // if donni and hurdle are in the same place at same time, end game
            if (hurdlePosition > 0 && hurdlePosition < 60 && donniPosition < 60) {
                clearInterval(hurdleTimer);
                isOver.html('Game Over');
                isOver.removeClass('d-none');
                isOver.addClass('over');
                gameOver = true;
                // $playagainButton.removeClass('d-none');
                // $playagainButton.addClass('d-block');

                // everything disappears at gameover
                while (donniarea.firstChild) {
                    donniarea.removeChild(donniarea.lastChild);
                }
            // keep score - if hurdle comes and donni doesnt touch it, add points
            } else if (hurdlePosition > 0 && hurdlePosition < 60 && donniPosition > 60) {
                score++;
                $('#taco').html(`<img class="tacos" src="img/taco.png">`);
                $('.points').html(`<h4 class="outline pink">Score:<span class="green"> ${score}</span</h4><img class="taco-score" src="img/taco.png">`)
                $('#taco img').fadeTo("slow", 0.0);
            }
            // increase this number to speed up hurdles
            hurdlePosition -= 6;
            hurdle.style.left = hurdlePosition + 'px';
        }, 30)
        if (!gameOver) {
            setTimeout(makeHurdles, randoTime);
        }
    }
}

    
