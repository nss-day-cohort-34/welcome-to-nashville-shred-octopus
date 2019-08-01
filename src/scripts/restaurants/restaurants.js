const restaurantData = userCuisine => {
    return fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&apikey=3f386498364bc7bd4dfd0206735f7c87&q=${userCuisine}`)
        .then(data => data.json())

}


const createRestHTML = (object, IdNum) => {
    const restHTML = `
        <section>
        <p>${object.restaurant.name} </br> ${object.restaurant.location.address}</p>
        
        <button class="saveRest__button saveRest__${IdNum}">Save</button></section>`


    return restHTML;
}




const addRestHTML = (HTMLString, container) => {
    container.innerHTML += HTMLString;
};
const addRestToFinal = (HTMLString, container) => {
    container.innerHTML += HTMLString;
};


// Call fetch function and pass in user's selected cuisine
const searchRestButton = document.getElementById("restsearch_button")
searchRestButton.addEventListener('click', (event) => {
    let restSearch = document.getElementById("restaurantsinput")
    restaurantData(restSearch.value).then(Allfoods => {
        const resultsContainer = document.querySelector('.results__List');
        resultsContainer.innerHTML = '';
        let id = 0
        let allfoods = Allfoods.restaurants
        restSearch.value = ''
        allfoods.forEach(foods => {
            if (allfoods.indexOf(foods) < 35000) {

                const resthtmlrep = createRestHTML(foods, id)
                addRestHTML(resthtmlrep, resultsContainer)
                id += 1



            }




  //add event listener to save button and display to dom          
            const parentContainer = document.querySelector(".results__List")
            parentContainer.addEventListener("click", (event) => {
                const saveButtonClass = event.target.classList[1];

                const savebutton = document.querySelector(`.${saveButtonClass}`)
                if (saveButtonClass.includes("saveRest__")) {
                    const restContainer = savebutton.parentElement
                    const restItem = restContainer.childNodes[1]

                    const newHtml = `<h3>${restItem.textContent}</h3>`
                    const itineraryResults = document.querySelector(".itinerary__restaurant")
                    itineraryResults.innerHTML = newHtml
                }

            })
        });
    });
});












