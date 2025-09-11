$(document).ready(function() {
    // Create a "close" button and append it to each list item
    $(".to-do-ul li").each(function() {
        var span = $("<span class='to-do-close'>&times;</span>");
        $(this).append(span);
    });

    // Click on a close button to hide the current list item
    $(document).on("click", ".close", function() {
        $(this).parent().hide();
    });

    // Add a "checked" class when clicking on a list item
    $(document).on("click", ".to-do-ul li", function() {
        $(this).toggleClass("to-do-checked");
    });

    // Create a new list item when clicking on the "Add" button
    $(document).ready(function() {
        var toDoAddBtn = $("#to-do-addBtn");
        var toDoInput = $("#to-do-myInput");
        var myUL = $("#myUL");

        toDoAddBtn.click(function() {
            var inputValue = toDoInput.val();
            if (inputValue === '') {
                alert("You must write something!");
            } else {
                var li = $("<li>").text(inputValue);
                myUL.append(li);
                var span = $("<span class='close'>&times;</span>");
                li.append(span);
            }
            toDoInput.val("");
        });
    });

});


$(document).ready(function() {
    // Function to check if the screen width is below a certain threshold
    function isMobile() {
        return $(window).width() < 768; // Adjust this threshold as needed
    }

    // Function to remove the class 'center-discovery' from the main element if it's mobile
    function removeCenterOnMobile() {
        if (isMobile()) {
            $("main").removeClass("center-discovery");
        }
    }

    // Remove class 'center-discovery' on document ready
    removeCenterOnMobile();

    // Remove class 'center-discovery' on window resize (to handle orientation changes)
    $(window).resize(function() {
        removeCenterOnMobile();
    });
});
$(document).ready(function() {
    $(".card-discover").hover(
        function() {
            // On mouse enter
            $(this).find(".fakeimg").hide(); // Hide the image within the hovered card-discover
            $(this).find(".txtToHide").show(); // Show the text within the hovered card-discover
        },
        function() {
            // On mouse leave
            $(this).find(".txtToHide").hide(); // Hide the text within the hovered card-discover
            $(this).find(".fakeimg").show(); // Show the image within the hovered card-discover
        }
    );
});

document.addEventListener("DOMContentLoaded", function() {
    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Check if it's the first visit
        if (!localStorage.getItem("lastVisit")) {
            localStorage.setItem("lastVisit", new Date());
            displayMessage("Welcome! Let us know if you have any questions.");
        } else {
            var lastVisit = new Date(localStorage.getItem("lastVisit"));
            var now = new Date();
            var timeDifference = now - lastVisit;
            var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference === 0) {
                displayMessage("Back so soon! Awesome!");
            } else {
                var message;
                if (daysDifference === 1) {
                    message = "You last visited 1 day ago.";
                } else {
                    message = "You last visited " + daysDifference + " days ago.";
                }
                displayMessage(message);
            }

            // Update last visit date
            localStorage.setItem("lastVisit", now);
        }
    } else {
        // If localStorage is not supported
        displayMessage("Local storage is not supported. We can't track your visit.");
    }
});

function displayMessage(message) {
    var messageText = document.getElementById("messageText");
    messageText.textContent = message;

    // Display visit time
    var visitTime = new Date().toLocaleString();
    var visitTimeText = document.getElementById("visitTime");
    visitTimeText.textContent = "Visit time: " + visitTime;
}


