// Get data for concerts in Nashville

const getConcertData = () => {
    return fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=343&apikey=r4LapB95qG4riVlovapgNoC7OX029GrF')
    .then(response => response.json());
};


// Write a function that takes in a concert object and generates an html representation of that object

let concertID = 0;

const createConcertHTML = (object) => {
    const concertHTML = `<section class="concert concert__${concertID}">
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

// -------------- Main Application Functionality ---------------

// Add event listener for concert search button
const searchConcertsButton = document.querySelector('.search__concerts');

searchConcertsButton.addEventListener('click', (event) => {

    getConcertData().then(parsedConcerts => {
        const concerts = parsedConcerts._embedded.events;
        const concertResultsContainer = document.querySelector('.concert__results');

        // Loops through the array of concerts and creates an HTML representation of the concert with its name and location, and adds the representation to the concertResultsContainer on the DOM. Limits results to 4.
        concerts.forEach(concert => {
            if (concerts.indexOf(concert) < 4) {
                const concertHTML = createConcertHTML(concert);
                addConcertHTML(concertHTML, concertResultsContainer);
            }
        });
    });
});

// Add an event listener to the concert results container that updates the itinerary with the corresponding concer when the user clicks 'save' for a particular concert.

concertResultsContainer = document.querySelector('.concert__results');
concertResultsContainer.addEventListener('click', (event) => {
    // Get a reference to the save button that was clicked
    const saveButton = document.querySelector(`.${event.target.classList[1]}`);
    // Get a reference to the save button's parent container
    const concertContainer = saveButton.parentElement;
    // Get a reference to the concert title and location
    const concertTitle = concertContainer.childNodes[1];
    const concertLocation = concertContainer.childNodes[3];

    const newItinerary = `<h2>${concertTitle.innerHTML}</h2>
                        <p>${concertLocation.innerHTML}</p>`;

    // Get a reference container to concert itinerary
    const concertItinerary = document.querySelector('.itinerary__concert');

    // Add concert title and location to the itinerary
    concertItinerary.innerHTML = newItinerary;

});



