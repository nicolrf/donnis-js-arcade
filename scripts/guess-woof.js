////// guess woof game ///////////
$(document).ready(function () {
    let $finalResponse = $('.final');
    let $winOrLoseDisplay = $('.guess-bk');
    let $guessInput = $("#guessInput");
    let $finalInput = $("#finalInput");
    let playerOneDog = '';
    let secretDog = '';
    // let dogsPlayerTwo = [];
    
    var Dog = function(name, imag, chars) {
        this.name = name;
        this.imag = imag;
        this.chars = chars;
    }
    // todo: use regex, improve guessing 
    // keep arrays for possible use with text input/regex
    var dogHarry = new Dog('Harry','harry.png', ['glasses', 'tie']);
    var dogLarry = new Dog('Larry','larry.png', ['hat', 'shoes', 'sneakers', 'cap']);
    var dogBarry = new Dog('Barry','barry.png', ['mustache', 'hat', 'hair']);
    var dogDonni = new Dog('Donni','donni.png', ['hat', 'crown']);
    var dogJerry = new Dog('Jerry','jerry.png', ['hat', 'cap']);
    var dogPerry = new Dog('Perry','perry.png', ['glasses', 'sunglasses', 'shoes', 'boots']);

    let dogsAry = [dogHarry, dogLarry, dogBarry, dogDonni, dogJerry, dogPerry];

    $('.play-guess').on('click', function(players){
        let $fullBoard = $('.full-board')
        /// if single player, show question form, otherwise show chat (todo)
        if (this.id == 'choose-deck') {
            $('.single').removeClass('d-none');
        }
        let randoDog = Math.floor(Math.random() * dogsAry.length);
        playerOneDog = dogsAry[randoDog];
        // return array minus player one's selection (2player todo)
        let dogsFiltered = dogsAry.filter(function( obj ) {
            return obj.name !== playerOneDog.name;
        });
        let randoDogTwo = Math.floor(Math.random() * dogsFiltered.length);
        // assign secret dog from the filtered array
        secretDog = dogsFiltered[randoDogTwo];
        dogsAryPlayerTwo = dogsFiltered;
        // go from selection screen to actual game
        $("#startSection").addClass('d-none');
        $fullBoard.removeClass('d-none');
        console.log(`The secret dog is: ${secretDog.name}`);
    });

    // click function for guess buttons
    const guessOptions = document.querySelectorAll("[data-guess]");
    guessOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
          event.preventDefault();
          const {guess} = option.dataset;
          console.log(guess);
          guessButtons(guess);
        });
    })

    // response to guess input
    function guessButtons(guess) {
        let $answers = $('.answers');
        // let ary = [];
        // ary.push(secretDog.chars);
        // ary.forEach (function(x) {
        //     console.log(x);
        //     console.log(`array: ${ary} input: ${guess}`);
        // })
        if (secretDog.chars.includes(guess)) {
            console.log(`yes ${guess}`);
            let a = '';
            if (['hat','mustache','tie'].includes(guess)) {
                a = 'a';
            }
            $answers.html(`<p class='pink'>Woof! Your dog has ${a} ${guess}</p>`);
        } else {
            console.log(`no ${guess}`);
            $answers.html(`<p class='pink'>Nope, no ${guess}</p>`);
        }
    }

    // if your guess is wrong you lose automatically. else win
    $("#final").on('click', function(){
        finalInput = $finalInput.val().toLowerCase();
        answer = secretDog.name.toLowerCase();
        $finalInput.val('');
        if (finalInput == answer) {
            let winlose = `<div class='m-auto'><h3>${secretDog.name} is correct! You win!!!!</h3></div>`;
            $winOrLoseDisplay.html(winlose).css('height', '300px').removeClass('guess-bk');
        } else {
            let winlose = `<div class='m-auto'><h3>Nope, it's not ${finalInput}.<br>The correct dog was ${secretDog.name}.<br> Game Over :(</h3></div>`;
            $winOrLoseDisplay.html(winlose).css('height', '300px').removeClass('guess-bk');
        }
        $('.guess-form').addClass('d-none');
    });

    // display dog cards randomly on the dogboard
    function shuffleDogs() {
        for (var i = 0; i < dogsAry.length; i++) {
            $("#dogBoard .row").append(`<div class='col-6 col-md-4 text-center my-3'><img class='board-image rounded' src='img/${dogsAry[i].imag} '></div>`);
        }
    }
    shuffleDogs();
    // click card to flip over if you think it's not the answer
    $('#dogBoard').on('click', '.board-image', function(){
        $(this).toggleClass('not-it');
    });
});
    