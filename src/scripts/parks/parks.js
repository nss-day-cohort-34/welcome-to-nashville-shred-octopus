


//create event listener to trigger search upon button click

const parkSearchButton = document.getElementById("park__searchbutton")
  
const select = document.getElementById("parkFeature")

parkSearchButton.addEventListener("click", () => {
    fetch(`https://data.nashville.gov/resource/74d7-b74t.json?$$app_token=cjh7CiBKoXfwugBplSHY8PgiU&${select.value}=Yes`)
    .then(data => data.json())
    .then(parks => {
        console.log(parks)
        document.querySelector(".results__List")
        .innerHTML = ""
        parks.forEach(park => {
        const converted = parkAsHTML(park)
        parkFactory(converted);
    });
  })
})

//generate HTML representation for each result
let buttonID = 0

const parkAsHTML = (object) => {
    buttonID += 1
    return `
    <section class="parkResultList">
        <h3>${object.park_name}</h3>
        <h3>${object.mapped_location.human_address.replace('{"address": "', "").replace('", "city": "', ", ").replace('", "state": "', ", ").replace('", "zip": ""}', "")
        .replace('", "zip": "37206"}', "")
        .replace('", "zip": "37080"}', "").replace('", "zip": "37013"}', "").replace('", "zip": "37138"}', "").replace('", "zip": "37211"}', "")
        .replace('", "zip": "37212"}', "").replace('", "zip": "37205"}', "").replace('", "zip": "37027"}', "").replace('", "zip": "37214"}', "")
        .replace('", "zip": "37209"}', "").replace('", "zip": "37076"}', "").replace('", "zip": "37115"}', "")}</h3>
       
        <button class="park__savebutton park__save__${buttonID}">Save</button>
    </section>
    `
}


//factory function to insert HTML into DOM
const container = document.querySelector(".results__List")

const parkFactory = (HTMLRepresentation) => {
    container.innerHTML += HTMLRepresentation;
}

//Get a reference to results list and add event listener that listens for a click anywhere inside the contianer.
// On the click - create conditional saying that if click was on any of the save buttons, get reference to parent. parent has properties including array of
// all children. Generate html snippet from array and insert into itinerary 

const parentContainer = document.querySelector(".results__List")

parentContainer.addEventListener("click", function (event) {
    const savebuttonClass = event.target.classList[1];
    const savebutton = document.querySelector(`.${savebuttonClass}`)
    if (savebuttonClass.includes("park__save")) {
        const parksContainer = savebutton.parentElement
        const h31 = parksContainer.childNodes[1]
        const h32 = parksContainer.childNodes[3]
        const newHTML = `<h3>${h31.innerHTML} ${h32.innerHTML}</h3>`
        const outputItinerary = document.getElementById("park__itinerary")
        outputItinerary.innerHTML = newHTML
    }
    
})
