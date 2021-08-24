const $mainContainer = $('#main-container');
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
    $('#guess').on('click', function() {
        console.log('guesswoof game selected');
        $mainContainer.addClass('d-none');
        $guesswoof.removeClass('d-none');
        $suggestionBox.addClass('d-none');
        $userInfo.addClass('d-none');
    });
    //select donnisaur 
    $('#donni').on('click', function() {
        console.log('donnisaur game selected');
        $mainContainer.addClass('d-none');
        $donnisaur.removeClass('d-none');
        $('#clickDon').html('Click DonniSaur');
        playDonnisaur();
    });
});
