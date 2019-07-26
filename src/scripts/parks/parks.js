//fetch data from parks api

const fetcher = () => {
    fetch("https://data.nashville.gov/resource/74d7-b74t.json?$$app_token=cjh7CiBKoXfwugBplSHY8PgiU")
    .then(data => data.json())
    .then(parks => {
        console.log(parks)
    }
)}

fetcher();

//create function to capture user input in variable
const userInput = document.getElementById("park__searchbox")
const getInput = () => {
    return userInput.value
}


//create event listener to trigger search upon button click
const ouputResult = document.querySelector(".results__List")

const parkSearchButton = document.getElementById("park__searchbutton")

// parkSearchButton.addEventListener("click", () => {
//     console.log(getInput());
// })
  
const select = document.getElementById("parkFeature")

parkSearchButton.addEventListener("click", () => {
    fetch(`https://data.nashville.gov/resource/74d7-b74t.json?$$app_token=cjh7CiBKoXfwugBplSHY8PgiU&${select.value}=Yes`)
    .then(data => data.json())
    .then(parks => {
        console.log(parks)
    parks.forEach(park => {
        const converted = parkAsHTML(park)
        parkFactory(converted);
    });
  })
})

//generate HTML representation for each result
const parkAsHTML = (object) => {
    return `
    <section class="parkResultList">
        <h3>${object.park_name}
        <h3>${object.mapped_location.human_address.replace('{"address": "', "").replace('", "city": "', ", ").replace('", "state": "', ", ").replace('", "zip": ""}', "")}
    </section>
    `
}

//factory function to insert HTML into DOM
const container = document.querySelector(".results__List")

const parkFactory = (HTMLRepresentation) => {
    container.innerHTML += HTMLRepresentation;
}