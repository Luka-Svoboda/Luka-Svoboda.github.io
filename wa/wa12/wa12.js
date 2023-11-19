const newQuoteButton = document.querySelector("#js-new-quote");
const photoButton = document.querySelector("#js-photo");

newQuoteButton.addEventListener("click", getQuote);
photoButton.addEventListener("click", displayRandomImage);

document.addEventListener("DOMContentLoaded", getQuote);

async function getQuote() {
    console.log("Button clicked!");

    const url = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=movies&count=10';
    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '4b9203d8cdmsh7b8ddf9c75a5407p16467fjsnb8efe7fdb2b7',
            'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); 
        console.log("Fetched quote:", data);

        displayQuote(data[0].quote); 
    } catch (error) {
        console.error("Error fetching quote:", error);
        alert("Failed to fetch quote. Please try again.");
    }
}

function displayQuote(quoteText) {
    const quoteElement = document.getElementById("js-quote-text");
    quoteElement.textContent = quoteText;
}

function displayRandomImage() {
    const images = [
        "pic1.jpeg",
        "pic2.jpeg",
        "pic3.jpeg",
        "pic4.jpeg",
        "pic5.jpeg",
        "pic6.jpeg",
        "pic7.jpeg",
        "pic8.jpeg",
        "pic9.jpeg",
        "pic10.jpeg",
        "pic11.jpeg",
        "pic12.jpeg"
    ];

    
    const randomIndex = Math.floor(Math.random() * images.length);

    const imageElement = document.getElementById("js-image");

    imageElement.src = images[randomIndex];
}