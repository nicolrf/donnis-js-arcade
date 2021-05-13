
////// guess woof game ///////////
const $allMessages = $("#messages");
const getChats = db.ref("messages");
let msg = '';
let usertwo = '';
// username = displayName;

const $myDogSection = $("#dogDiv");
const $dogBoard = $("#dogBoard .row");
const $startSection = $("#startSection");
const $startButton = $('.play-guess');
const $askButton = $("#ask");
const $finalButton = $("#final");
let $askInput = $("#askInput");
let $finalInput = $("#finalInput");

let playerOne = '';
let playerOneDog = '';
let playerTwoDog = '';
let dogsPlayerTwo = [];

/////// chat for 2 player version /////
// on chat submit, sendmsg
$('#chat-btn').on('click', sendMsg);
function sendMsg(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const $chatTxt = $("#chat-txt");
    const message = $chatTxt.val();
    // $chatTxt.val('');
    db.ref("messages/" + timestamp).set({
     usr: username,
     msg: message,
    });
    // clear input after sent
    $chatTxt.val('');
}

getChats.on("child_added", function (theMessages) {
    // get all the chats
    const messages = theMessages.val();
    console.log(messages.msg == undefined);
    // don't display messages from the suggeston form
    if (messages.msg != undefined) {
        // if msg is from me display with my styles
        // else, use other style
        // scroll chat automatically 
        if (username == messages.usr) {
            msg = `<div class='from-msg p-1 font-weight-light electrolize yellow'><span class='font-weight-bold font-lg from-usr mr-2 green'>${messages.usr} </span> ${messages.msg}</div>`;
            $allMessages.append(msg);
            $("#chat").stop().animate({ scrollTop: $("#chat")[0].scrollHeight}, 1000);
        } else if (username != messages.usr) {
            // console.log(msg);
            msg = `<div class='to-msg p-1 font-weight-light electrolize yellow'><span class='font-weight-bold font-lg to-usr mr-2 green'>${messages.usr} </span> ${messages.msg}</div>`;
            $allMessages.append(msg);
            $("#chat").stop().animate({ scrollTop: $("#chat")[0].scrollHeight}, 1000);     
        }
    }
});


var Dog = function(name, imag, chars) {
    this.name = name;
    this.imag = imag;
    this.chars = chars;
}

var dogHarry = new Dog('Harry','harry.png', ['glasses', 'tie']);
var dogLarry = new Dog('Larry','larry.png', ['hat', 'shoes', 'sneakers', 'cap']);
var dogBarry = new Dog('Barry','barry.png', ['mushtache', 'hat']);
var dogDonni = new Dog('Donni','donni.png', ['hat', 'crown']);
var dogJerry = new Dog('Jerry','jerry.png', ['hat', 'cap']);
var dogPerry = new Dog('Perry','perry.png', ['glasses', 'sunglasses', 'shoes', 'boots']);

let dogsAry = [dogHarry, dogLarry, dogBarry, dogDonni, dogJerry, dogPerry];
// let dogsNamesAry = [dogHarry.name, dogLarry.name, dogBarry.name, dogDonni.name, dogJerry.name, dogPerry.name];

$startButton.on('click', function(players){
    // console.log(this.id);

    /// if single player, show question form, otherwise show chat
    if (this.id == 'choose-single') {
        $('.single').removeClass('d-none');
    } else {
        $('.multi').removeClass('d-none');
    }

    // console.log(username);
    username = displayName;
    playerOne = username;
    $('#messages').empty();

    let randoDog = Math.floor(Math.random() * dogsAry.length);
    playerOneDog = dogsAry[randoDog];

    $myDogSection.html(`<img src='img/${dogsAry[randoDog].imag}'>`);
    $myDogSection.append(`<p>Hi <span class='yellow'>${playerOne}!</span><br> Your dog is: <span class='yellow'>${dogsAry[randoDog].name}</span> <p>`);

    // return array minus player one's selection
    console.log(dogsAry);
    let dogsFiltered = dogsAry.filter(function( obj ) {
        // console.log(playerOneDog.name);
        return obj.name !== playerOneDog.name;
    });

    let randoDogTwo = Math.floor(Math.random() * dogsFiltered.length);
    playerTwo = usertwo || 'your opponent';
    // assign player twos' dog from the filtered array
    playerTwoDog = dogsFiltered[randoDogTwo];
    dogsAryPlayerTwo = dogsFiltered;

    // go from selection screen to actual game
    $startSection.addClass('d-none');
    $('.full-board').removeClass('d-none');

    console.log(`${playerOne}'s dog is: ${playerOneDog.name}`);
    console.log(`${playerTwo}'s dog is: ${playerTwoDog.name}`);
});

$askButton.on('click', function(){

    let askInput = $askInput.val();
    $askInput.val('');
    let stringMatch = '';
    let result = '';
    let string = '';

    let ary = [];
    ary.push(playerTwoDog.chars);
    ary.forEach (function(x) {
        console.log(x);
        string = askInput.toLowerCase();
        console.log(`array: ${ary} input: ${string}`);
    })

    if (playerTwoDog.chars.includes(string)) {
        console.log(`yes ${string}`);
        $('.answers').html(`<p class='pink'>Yes! ${playerTwo}'s dog has a ${string}</p>`);
    } else {
        console.log(`<p class='pink'>no ${askInput}</p>`);
        $('.answers').html(`<p class='pink'>Nope, no ${askInput}</p>`);
    }
});

// if your final guess is right you lose automatically. else win
$finalButton.on('click', function(){
    finalInput = $finalInput.val().toLowerCase();
    answer = playerTwoDog.name.toLowerCase();
    $finalInput.val('');
    if (finalInput == answer) {
        // console.log(`Winner! ${finalInput} is the dog!`);
        $('.final').html(`<p class='pink'>${finalInput} is correct! You win!</p>`);
        let winlose = `<div class='m-auto'><h3>You are the winner, ${username}!!!</h3></div>`;
        $('.guess-bk').html(winlose).css('height', '300px').removeClass('guess-bk');
    } else {
        // console.log(`Nope, not ${finalInput}`)
        $('.final').html(`<p class='pink'>Nope, it's not ${finalInput}</p>`);
        let winlose = `<div class='m-auto'><h3>Game Over, ${username}</h3></div>`;
        $('.guess-bk').html(winlose).css('height', '300px').removeClass('guess-bk');
    }
});

// display dog cards randomly on the dogboard
function shuffleDogs() {
    for (var i = 0; i < dogsAry.length; i++) {
        // console.log(dogs[i].name);
        $dogBoard.append(`<div class='col-3 text-center m-1'><img class='board-image rounded' src='img/${dogsAry[i].imag} '></div>`);
    }
}
shuffleDogs();

// click card to flip over if you think it's not the answer
$('#dogBoard').on('click', '.board-image', function(){
    // console.log('not-it');
    $(this).toggleClass('not-it');
});
