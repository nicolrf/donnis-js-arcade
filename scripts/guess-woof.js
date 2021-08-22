////// guess woof game ///////////
const $dogBoard = $('#dogBoard');
const $dogBoardRow = $("#dogBoard .row");
const $startSection = $("#startSection");
const $startButton = $('.play-guess');
const $askButton = $("#ask");
const $finalButton = $("#final");
const $singlePlayerDisplay = $('.single');
const $guessForm = $('.guess-form');

let $finalResponse = $('.final');
let $winOrLoseDisplay = $('.guess-bk');
let $askInput = $("#askInput");
let $finalInput = $("#finalInput");
let playerOneDog = '';
let secretDog = '';
// let dogsPlayerTwo = [];

var Dog = function(name, imag, chars) {
    this.name = name;
    this.imag = imag;
    this.chars = chars;
}
var dogHarry = new Dog('Harry','harry.png', ['glasses', 'tie']);
var dogLarry = new Dog('Larry','larry.png', ['hat', 'shoes', 'sneakers', 'cap']);
var dogBarry = new Dog('Barry','barry.png', ['mushtache', 'hat', 'hair']);
var dogDonni = new Dog('Donni','donni.png', ['hat', 'crown']);
var dogJerry = new Dog('Jerry','jerry.png', ['hat', 'cap']);
var dogPerry = new Dog('Perry','perry.png', ['glasses', 'sunglasses', 'shoes', 'boots']);

let dogsAry = [dogHarry, dogLarry, dogBarry, dogDonni, dogJerry, dogPerry];

$startButton.on('click', function(players){
    let $fullBoard = $('.full-board')
    /// if single player, show question form, otherwise show chat (todo)
    if (this.id == 'choose-deck') {
        $singlePlayerDisplay.removeClass('d-none');
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
    $startSection.addClass('d-none');
    $fullBoard.removeClass('d-none');
    console.log(`The secret dog is: ${secretDog.name}`);
});

$askButton.on('click', function(){
    let $answers = $('.answers');
    let askInput = $askInput.val();
    $askInput.val('');
    let stringMatch = '';
    let result = '';
    let string = '';

    let ary = [];
    ary.push(secretDog.chars);
    ary.forEach (function(x) {
        console.log(x);
        string = askInput.toLowerCase();
        console.log(`array: ${ary} input: ${string}`);
    })

    if (secretDog.chars.includes(string)) {
        console.log(`yes ${string}`);
        $answers.html(`<p class='pink'>Woof! The dog has a ${string}</p>`);
    } else {
        console.log(`no ${askInput}`);
        $answers.html(`<p class='pink'>Nope, no ${askInput}</p>`);
    }
});

// if your final guess is right you lose automatically. else win
$finalButton.on('click', function(){
    finalInput = $finalInput.val().toLowerCase();
    answer = secretDog.name.toLowerCase();
    $finalInput.val('');
    if (finalInput == answer) {
        $finalResponse.html(`<p class='pink'>${finalInput} is correct! You win!</p>`);
        let winlose = `<div class='m-auto'><h3>You win!!!!</h3></div>`;
        $winOrLoseDisplay.html(winlose).css('height', '300px').removeClass('guess-bk');

    } else {
        $finalResponse.html(`<p class='pink'>Nope, it's not ${finalInput}</p>`);
        let winlose = `<div class='m-auto'><h3>Game Over :(</h3></div>`;
        $winOrLoseDisplay.html(winlose).css('height', '300px').removeClass('guess-bk');
    }
    $guessForm.addClass('d-none');
});

// display dog cards randomly on the dogboard
function shuffleDogs() {
    for (var i = 0; i < dogsAry.length; i++) {
        $dogBoardRow.append(`<div class='col-4 text-center my-3'><img class='board-image rounded' src='img/${dogsAry[i].imag} '></div>`);
    }
}
shuffleDogs();
// click card to flip over if you think it's not the answer
$dogBoard.on('click', '.board-image', function(){
    $(this).toggleClass('not-it');
});