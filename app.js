
// $(document).ready(function () {
    console.log('loaded');
    /////// vars
    var db = firebase.database();
    let username = '';
    let displayName = '';
    let myLoc = '';
    let myWeather = '';
    let myTemp = '';
    let $home = $('#home');
    let $suggestionBox = $('#suggestionBox');
    // get weather for donnisaur game
    getWeather();

    ///////////// nav buttons ///////////
    $home.on('click', function() {
        location.reload();
    });

    $suggestionBox.on('click', function() {
        $('#suggestions').removeClass('d-none');
        $('.games-container').addClass('d-none');
        $('#user-info').addClass('d-none');
    });

    //////// game selection /////////////
    //select guess woof
    $('#guess').on('click', function() {
          console.log('guesswoof game selected');
        $('#main-container').addClass('d-none');
        $('#guesswoof').removeClass('d-none');
        $suggestionBox.addClass('d-none')
    });
    //select donnisaur 
    $('#donni').on('click', function() {
          console.log('donnisaur game selected');
        $('#main-container').addClass('d-none');
        $('#donnisaur').removeClass('d-none');
        $suggestionBox.addClass('d-none')
        playDonnisaur();

    });

    //get weather for donnisaur backgrounds
    function getWeather() {
        'use strict';
        (function() {
            navigator.geolocation.getCurrentPosition(function (position) {
                let myLat = position.coords.latitude;
                let myLon = position.coords.longitude;
                var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
                
                //for testing places with different weather
                // $.get(`${weatherUrl}lat=32.0809&lon=-81.0912&appid=${apiKey}`).then(function (response) {
                $.get(`${weatherUrl}lat=${myLat}&lon=${myLon}&appid=${weatherKey}`).then(function (response) {
                    // console.log(response);
                    myLoc = response.name;
                    myTemp = response.main.temp;
                    myWeather = response.weather[0].main;
                    let myPic = response.weather[0].icon;
                    let pic = 'http://openweathermap.org/img/wn/'+myPic+'@2x.png';

                    let $myLoc = $('#location')
                    let $temp = $('#temp');
                    let $mainWeather = $('#mainWeather');
                    let $pic = $('#pic');

                    $myLoc.text(myLoc);
                    $temp.text(parseInt(1.8*(myTemp - 273) + 32) + ' degrees');
                    $mainWeather.text(myWeather);
                    $pic.html(`<img class='d-sm-block d-none w-25' src='${pic}'>`);
                })
            });
        })();
    }

    ////////////////////// firebase sign-in things ///////////////
    // sign in click
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        } else {
            var $email = $('#email').val();
            var password = $('#password').val();
        }
        if ($email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password (at least 4 characters).');
            return;
        }

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Sign in with email and pass.
        firebase.auth().signInWithEmailAndPassword($email, password).catch(function(error) {
            // error handling
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('signin').disabled = false;
        });
        document.getElementById('signin').disabled = true;
    }

    // sign up button
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      // Create user with email and pw
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // error handling
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }

    // initApp - updates UI based on signin status
    function initApp() {
        // auth state change
        firebase.auth().onAuthStateChanged(function(user) {
            // document.getElementById('verify-email').disabled = true;
            if (user) {
                // User is signed in
                var email = user.email;
                // create default usrname from first part of email address
                // todo: account page where updates can be made
                displayName = user.displayName || 'default-' + email.substring(0,5);
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                console.log(uid);

                document.getElementById('name-info').textContent =  displayName;
                document.getElementById('signin-status').textContent = 'Signed in';
                $('#signin').text('Sign Out');
                $('#sign-up').addClass('d-none');
                $('#usrname').removeClass('d-none');
                $('#email-section').addClass('d-none');
                $('#pw-section').addClass('d-none');
                $('#games').removeClass('d-none');
                // area for testing
                document.getElementById('account-info').textContent = JSON.stringify(user, null, '  ');
            } else {
                // User is signed out
                $('#signin').text('Sign in');
                $('#sign-up').removeClass('d-none');
                $('#usrname').addClass('d-none');
                $('#email-section').removeClass('d-none');
                $('#pw-section').removeClass('d-none');
                $('#games').addClass('d-none');
                // $('#account-info').text('null');
            }

            document.getElementById('signin').disabled = false;
      });

      document.getElementById('signin').addEventListener('click', toggleSignIn, false);
      document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    }

    window.onload = function() {
      initApp();
    };


    //////////// other signin things/style /////////
    $('#email').on('click', function() {
        $('.email-label').addClass('label-text');
    });
    $('#email').on('focusout', function() {
        $('.email-label').removeClass('label-text');
    });
    $('#password').on('click', function() {
        $('.password-label').addClass('label-text');
    });
    $('#password').on('focusout', function() {
        $('.password-label').removeClass('label-text');
    });
    $('#message').on('click', function() {
        $('.email-label').addClass('label-text');
    });
    $('#message').on('focusout', function() {
        $('.email-label').removeClass('label-text');
    });


// });
