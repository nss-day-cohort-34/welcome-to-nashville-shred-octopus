
// --------------- Data Functionality for Concerts ---------------
// Get data for concerts in Nashville

const getConcertData = (keyword) => {
    return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=343&keyword=${keyword}&size=50&apikey=r4LapB95qG4riVlovapgNoC7OX029GrF`)
    .then(response => response.json());
};

// --------------- Helper functions for Concerts ---------------

// Write a function that takes in a concert object and generates an html representation of that object

let concertID = 0;

const createConcertHTML = (object) => {
    const concertHTML = `<section class="concert concert__${concertID} result">
                            <h2>${object.name}</h2>
                            <p>Location: ${object._embedded.venues[0].name}</p>
                            <button class="concert__result concert__save__${concertID}">Save</button>
                        <section>`;
    
    concertID += 1;
    return concertHTML;
};

// Function that takes in an HTML string and a container, and adds the HTML String to the container

const addConcertHTML = (HTMLString, container) => {
    container.innerHTML += HTMLString;
};

// -------------- Main Application Functionality for Concerts ---------------

// Add event listener for concert search button
const searchConcertsButton = document.querySelector('.search__concerts');


searchConcertsButton.addEventListener('click', (event) => {
    // Get reference to value of concert search text input
    let concertSearch = document.querySelector('.search__concerts__keyword');

    // Call fetch function to get data, passing in the user-provided keyword;
    getConcertData(concertSearch.value).then(parsedConcerts => {
        const concerts = parsedConcerts._embedded.events;
        const concertResultsContainer = document.querySelector('.results__List');
        concertResultsContainer.innerHTML = '';
        concertSearch.value = '';
        

        // Loops through the array of concerts and creates an HTML representation of the concert with its name and location, and adds the representation to the concertResultsContainer on the DOM. Limits results to 4.
        concerts.forEach(concert => {
            if (concerts.indexOf(concert) < 10) {
                const concertHTML = createConcertHTML(concert);
                addConcertHTML(concertHTML, concertResultsContainer);
            }
        });
    });
    
});

// Add an event listener to the concert results container that updates the itinerary with the corresponding concer when the user clicks 'save' for a particular concert.

concertResultsContainer = document.querySelector('.results__List');

concertResultsContainer.addEventListener('click', (event) => {

    // Get a reference to the classList of the item that was clicked
    const classArray = event.target.classList;

    // Get a reference to the unique class for the item that was clicked
    const uniqueClass = classArray[1];

    // Get a reference to the button that was clicked
    const saveButton = document.querySelector(`.${uniqueClass}`);

    // Check to ensure a save button was clicked and not some random area of the container
    if (uniqueClass.includes('concert__save')) {

        // Get a reference to the save button's parent container
        const concertContainer = saveButton.parentElement;

        // Get a reference to the concert title and location
        const concertTitle = concertContainer.childNodes[1];
        const concertLocation = concertContainer.childNodes[3];

        // Create HTML representation with with title and location
        const newItinerary = `<h2>${concertTitle.innerHTML}</h2>
                            <p>${concertLocation.innerHTML}</p>`;

        // Get a reference container to concert itinerary
        const concertItinerary = document.querySelector('.itinerary__concert');

        // Add concert title and location to the itinerary
        concertItinerary.innerHTML = newItinerary;
    }
});



