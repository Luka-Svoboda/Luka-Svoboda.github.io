const newQuoteButton = document.querySelector("#js-new-quote");

newQuoteButton.addEventListener("click", getQuote);

function getQuote() {
    console.log("Button clicked!");

    const apiEndpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

    // Step 5: Change the getQuote function to use the fetch method to get a random quote from that endpoint.
    fetch(apiEndpoint)
        .then(response => {
            // Check if the response status is OK (status code 200)
            if (response.ok) {
                return response.json(); // Parse the JSON data
            } else {
                throw new Error("Failed to fetch quote");
            }
        })
        .then(data => {
            // Step 6: If successful, output the quote to the console
            console.log("Fetched quote:", data);

            // Step 7: Run the displayQuote function to display the fetched quote in the HTML element
            displayQuote(data.question);
        })
        .catch(error => {
            // Step 6 (cont.): If it fails, output an error message to the console AND via alert
            console.error("Error fetching quote:", error);
            alert("Failed to fetch quote. Please try again.");
        });
}

// Step 8: Write a second function called "displayQuote" that will display the text of a fetched quote in the HTML element with an id of js-quote-text.
function displayQuote(quoteText) {
    const quoteElement = document.getElementById("js-quote-text");
    quoteElement.textContent = quoteText;
}

// Step 9: Adjust getQuote to run displayQuote at the proper place in the code.
// This is already done in Step 7 where we call displayQuote(data.question);

// Step 10: Notice when you refresh that a quote isn't displayed. Fix that.
// You can call getQuote() when the page loads to display an initial quote.
document.addEventListener("DOMContentLoaded", getQuote);