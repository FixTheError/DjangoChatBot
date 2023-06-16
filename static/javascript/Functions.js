//A function to grab return a cookie with the indicated name
function get_cookie(name) {
    //create a variable to hold the desired cookie, 
    //and make sure that there are cookies to grab, and that
    //the cookies aren't just an empty string.
    let cookie_val = null;
    if (document.cookie && document.cookie !== '') {
        //If there are cookies, split the string into individual
        //name-cookie pairs, then loop through those pairs
        //and return the desired cookie if it exists, otherwise
        //cookie_val remains null.
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookie_val = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    } 
    return cookie_val;
}

//grab the csrf token.
csrftoken = get_cookie('csrftoken')

    //A function to check if the request method needsa csrf token or not,
    //returnes true if the csrf token is not necessary.
function safe_method(method) {
    return ['GET', 'OPTIONS', 'TRACE', 'HEAD'].includes(method);
}

//Set up AJAX to automatically include the csrf token
//in the header if needed by using the safe_method function to determine
//if it is necessary, and grab the token with get_cookie function.
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!safe_method(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

//A function to add new messages to the chat box.
function addmessage(res_url) {
    //Find the form and prevent the page from refreshing
    var in_form = document.getElementById('input_form')
    in_form.addEventListener('submit', function (event) {
        event.preventDefault();
    })
    //Get the text from the input box, reset it to blank,
    //and find the chat-box.
    var message = document.getElementById("input-box").value;
    document.getElementById("input-box").value = '';
    const chatbox = document.getElementById("chat-box");
    //Create a POST request that sends the user's message to the
    //URL that handles the chat-bot logic.
    $.ajax({
        type: "POST",
        url: "get_response/",
        data: {
            "message": message,
        },
        //If successful, append both the user's message and the
        //bot's response to the chat-box, then make the chat-box scroll to the bottom.
        success: function (response) {
            chatbox.innerHTML += "<p class='user-message'>" + message + "</p>";
            chatbox.innerHTML += "<p class='bot-message'>" + response.response + "</p>";;
            chatbox.scrollTop - chatbox.scrollHeight;
        }
    });
}

