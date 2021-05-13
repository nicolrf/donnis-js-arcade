// mainly from message board example
$(document).ready(function () {
    var messageAppReference = firebase.database();
    const $gameRequests = $('.message-board');

    $('#message-form').submit(function (event) {
        // by default a form submit reloads the DOM which will subsequently reload all our JS
        // to avoid this we preventDefault()
        event.preventDefault();
        // grab user message input
        var message = $('#message').val();
        // clear message input (for UX purposes)
        $('#message').val('');
        // create a section for messages data in your db
        var messagesReference = messageAppReference.ref('messages');
        // use the set method to save data to messages db
        messagesReference.push({
            message: message,
            votes: 0,
        });
    });

    (function getSuggestions() {
        // use reference to app database to listen for changes in messages data
        messageAppReference.ref('messages').on('value', function (results) {
            const allMessages = results.val();
            const messages = [];
            // iterate through results coming from database call; messages
            for (let msg in allMessages) {
                if (allMessages[msg].message) {

                    let message = allMessages[msg].message;
                    let numOfVotes = allMessages[msg].votes;
                    // create message element
                    let $gameSuggestionItem = $('<li></li>');
                    // create delete element
                    let $deleteElement = $('<i class="fa fa-trash pink pull-right delete"></i>');
                    $deleteElement.on('click', function (e) {
                        let id = $(e.target.parentNode).data('id');
                        deleteMessage(id);
                    });
                    // create down vote element
                    let $downVoteElement = $('<i class="fa fa-frown-o pull-right"></i>');
                    $downVoteElement.on('click', function (e) {
                        let id = $(e.target.parentNode).data('id');
                        updateMessage(id, --numOfVotes);
                    });
                    // create up vote element
                    let $upVoteElement = $('<i class="fa fa-smile-o pull-right"></i>');
                    $upVoteElement.on('click', function (e) {
                    let id = $(e.target.parentNode).data('id');
                    updateMessage(id, ++numOfVotes);
                    });

                    $gameSuggestionItem
                    .attr('data-id', msg)
                    .html(message)
                    .append($deleteElement)
                    .append($upVoteElement)
                    .append($downVoteElement)
                    .append('<div class="white pull-right">' + numOfVotes + '</div>');

                    // push element to array of messages
                    messages.push($gameSuggestionItem);
                }
          }
            // no duplicates
            $gameRequests.empty();
            for (let i in messages) {
                // console.log(messages[i])
                $gameRequests.append(messages[i]);
            }
            $gameRequests.append(`<li class="posts">${message}<br>Votes: ${votes}</li><br>`);
        });
    })();

    function updateMessage(id, votes) {
        // find message whose objectId is equal to the id we're searching with
        var messageReference = messageAppReference.ref('messages/' + id);
        // update votes property
        messageReference.update({ votes });
    }

    function deleteMessage(id) {
        // find message whose objectId is equal to the id we're searching with
        var messageReference = messageAppReference.ref('messages/' + id);
        messageReference.remove();
    }

});