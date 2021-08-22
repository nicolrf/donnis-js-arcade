const $gamesContainer = $('.games-container');
const $mainContainer = $('#main-container');
const $guessButton = $('#guess');
const $donniButton = $('#donni');
const $playagainButton = $('#playagain');
const $home = $('#home');
const $guesswoof = $('#guesswoof');
const $donnisaur = $('#donnisaur');
let myLoc = '';
let myWeather = '';
let myTemp = '';

$(document).ready(function () {
    console.log('arcade loaded');

    // nav buttons
    $home.on('click', function() {
        location.reload();
    });

    //select guess woof
    $guessButton.on('click', function() {
        console.log('guesswoof game selected');
        $mainContainer.addClass('d-none');
        $guesswoof.removeClass('d-none');
        $suggestionBox.addClass('d-none');
        $userInfo.addClass('d-none');
    });

    //select donnisaur 
    $donniButton.on('click', function() {
        console.log('donnisaur game selected');
        $mainContainer.addClass('d-none');
        $donnisaur.removeClass('d-none');
        $('#clickDon').html('Click DonniSaur');
        playDonnisaur();
    });

    // play game again
    $playagainButton.on('click', function() {
        console.log('clicked again')
        location.reload();
        $donniButton.click();
    });
});
