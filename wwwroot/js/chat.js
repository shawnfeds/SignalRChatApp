"use strict";

var username = document.getElementById("userInput").value;
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub?user=" + encodeURIComponent(username)).build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.on("PrivateMessageDelivered", function (toUser) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = ("Your private message to " + toUser + " was delivered.");
});

connection.on("UpdateUserList", function (users) {
    var toUserDropdown = document.getElementById("ToUser");
    toUserDropdown.innerHTML = '<option value="">Select a user</option>';
    users.forEach(function (user) {
        var option = document.createElement("option");
        option.value = user;
        option.textContent = user;
        toUserDropdown.appendChild(option);
    });
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var FromUser = document.getElementById("userInput").value;
    var ToUser = document.getElementById("ToUser").value;
    var message = document.getElementById("messageInput").value;

    if (ToUser != "") {
        connection.invoke("SendPrivate", FromUser, ToUser, message).catch(function (err) {
            return console.error(err.toString());
        });
    } else {
        connection.invoke("Broadcast", FromUser, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    
    event.preventDefault();
});