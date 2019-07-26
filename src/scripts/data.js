// Get data for concerts in Nashville

const getConcertData = () => {
    return fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=343&apikey=r4LapB95qG4riVlovapgNoC7OX029GrF')
    .then(response => response.json());
};
