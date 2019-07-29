//meetUpsData function takes 1 argument called meetUpTopic it should be a string 
//meetUpsData fetches using eventbrite api , and user suplied parameter (this is received when the user clicks a button)
const API_KEY = "25ZHNWHNEMRLCWIB3IJL"
const meetUpsData = (meetUpTopic) => {
  return fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${meetUpTopic}&location.address=nashville&token=${API_KEY}`,{
    "headers": {
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
}


// this function retreives the results from the meetupsData fetch and builds my template with a factory function it takes 1 argument which is an object.
const createEventHtml = (events) => {
  const eventDate = new Date(events.start.local)
  return `
  <section class="event__list"
  <h1 class="event__title"><a href="${events.url}">${events.name.text}</a> - ${eventDate.getMonth() + 1}/${eventDate.getDate()}/${eventDate.getFullYear()}</h1>
  <p class="event__description">${events.description.text.split(" ").slice(0,20).join(" ")}...<a href=${events.url}>more</a></p>
  <button class="save__to__itinerary">Save</button>
  <hr>
  </section>
  `
}
//created a function that will display the html inside the results container.
const displayingHtmlEvents = (htmlString) => {
  const renderEventsContainer = document.querySelector(".results__List")
  renderEventsContainer.innerHTML += htmlString
}
// selects the search button and uses the input value / #events to create the query.
document.querySelector("#event__button").addEventListener("click", (event) => {
  let eventInput = document.querySelector("#events")
  // invoking the meetUpsData fetch promise, then using the return data it iterates through the events array.
  // Creates Html template and displays the html.
  meetUpsData(eventInput.value).then((eventsData) => {
    const eventsContainer = document.querySelector('.results__List');
    eventsContainer.innerHTML = '';
    eventsData.events.forEach(element => {
      const eventHtml = createEventHtml(element)
      displayingHtmlEvents(eventHtml)
      // selected the Save button, and added an event listener once the button is clicked it sends the 
      //search results to the classs .itinerary__meetup
      const saveButtons = document.querySelectorAll(".save__to__itinerary")
      saveButtons.forEach(button => {
        button.addEventListener("click", () => {
        const anchorItem = button.parentElement.childNodes[0]
        const textItem = button.parentElement.childNodes[1]
        const descriptionItem = button.parentElement.childNodes[2]
        const newHtml = `<h1>${anchorItem.innerHTML} ${textItem.data}</h1>
        <p>${descriptionItem.innerHTML}</p>`

      const itineraryResults = document.querySelector(".itinerary__meetup")
      itineraryResults.innerHTML = newHtml
  
    })
    
    eventInput.value = '';
    
    
    
  })
  
});
})
})



  
