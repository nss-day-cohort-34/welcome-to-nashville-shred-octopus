// Write a function that takes in a concert object and generates an html representation of that object

let concertID = 0;

const createConcertHTML = (object) => {
    const concertHTML = `<section class="concert">
                            <h2>${object.name}</h2>
                            <p>Location: ${object._embedded.venues[0].name}</p>
                            <button class="concert__${concertID}">Save</button>
                        <section>`;
    
    concertID += 1;
    return concertHTML;
};

// Function that takes in an HTML string and a container, and adds the HTML String to the container

const addConcertHTML = (HTMLString, container) => {
    container.innerHTML += HTMLString;
};