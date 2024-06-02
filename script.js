// container
let container = document.getElementById("quote-container");

// text container

let quoteDiv = document.createElement("div");
quoteDiv.classList.add("quote-text");
// fa icon

let iconl = document.createElement("i");
iconl.classList.add("fas","fa-quote-left");
let iconr = document.createElement("i");
iconr.classList.add("fas","fa-quote-right");

// text span

let text = document.createElement("span");
text.id = "quote";

quoteDiv.appendChild(iconl);
quoteDiv.appendChild(text);
quoteDiv.appendChild(iconr);

// author

let authorDiv = document.createElement("div");
authorDiv.classList.add("quote-author");
let author = document.createElement("span");
author.id = "author";

authorDiv.appendChild(author);

// button
let btnDiv = document.createElement("div");
btnDiv.classList.add("button-container");

let button = document.createElement("button");
button.id = "new-quote";
button.classList.add("btn","btn-dark","btn-lg","fs-2");
button.textContent = "New Quote";

btnDiv.appendChild(button);

// assembling div's
container.appendChild(quoteDiv);
container.appendChild(authorDiv);
container.appendChild(btnDiv);

// loader
let loaderDiv = document.createElement("div");
loaderDiv.id = "loader";
container.appendChild(loaderDiv);

let loader = document.getElementById("loader");
// loader functions
function loading() {
    loader.hidden = false;
    container.hidden = true;
}
function complete() {
    loader.hidden = true;
    container.hidden = false;
}

// fill elements

const fillAuthor = document.getElementById("author");
const fillQuote = document.getElementById("quote");
const generateQuoteBtn = document.getElementById("new-quote");

// api call

async function getapi() {
    try {
        loading();
        const api_url ="https://api.quotable.io/quotes/random";
        const response = await fetch(api_url);
        var data = await response.json();
        if(!data[0]["author"]) {
            fillAuthor.textContent = "Unknown";
        } else {
            fillAuthor.textContent = data[0]["author"];
        }
        if(data[0]["content"].length > 100){
            text.classList.add("long-quote");
        } else {
            text.classList.remove("long-quote");
        }
        fillQuote.textContent = data[0]["content"];
        complete();
    } catch(err) {
        // error
	console.log(error);
    }
}
// on load
getapi();


// on button click
generateQuoteBtn.addEventListener("click", getapi);