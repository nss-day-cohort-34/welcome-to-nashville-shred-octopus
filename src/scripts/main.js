// Concerts

// Add event listener for concert search button
const searchConcertsButton = document.querySelector('.search__concerts');

searchConcertsButton.addEventListener('click', () => {

    getConcertData().then(parsedConcerts => {
        const concerts = parsedConcerts._embedded.events;
        const concertResultsContainer = document.querySelector('.concert__results');

    // Loops through the array of concerts and creates an HTML representation of the concert with its name and location, and adds the representation to the concertResultsContainer on the DOM. Limits results to 4.
        concerts.forEach(concert => {
            if (concerts.indexOf(concert) < 4) {
                const concertHTML = createConcertHTML(concert);
                console.log(concertHTML);
                addConcertHTML(concertHTML, concertResultsContainer);    
            }
            
        });

    });
});


