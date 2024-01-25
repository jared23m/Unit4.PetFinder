const state = {
    allPets: [],
    petByName: null,
    petByOwner: null
}

async function getAllPets(){
    try {
        const response = await fetch('/api/v1/pets');
        const json = await response.json();
        state.allPets = json;
        renderMain();
    } catch (error) {
        console.log(error);
    }
}

async function getPetByName(event, name){
    event.preventDefault();
    try{
        const response = await fetch(`/api/v1/pets/${name}`);
        const json = await response.json();
        state.petByName = json;
        renderMain();
    } catch (error) {
        console.log(error);
    }
}

async function getPetByOwner(event, owner){
    event.preventDefault();
    try{
        const response = await fetch(`/api/v1/pets/owner?owner=${owner}`);
        const json = await response.json();
        state.petByOwner = json;
        renderMain();
    } catch (error){
        console.log(error);
    }
}

const allPetsButtonContainer = document.getElementById("allPetsButtonContainer");
const allPetsContainer = document.getElementById("allPetsContainer");

const petByNameFormContainer = document.getElementById("petByNameFormContainer");
const petByNameContainer = document.getElementById("petByNameContainer");

const petByOwnerFormContainer = document.getElementById("petByOwnerFormContainer");
const petByOwnerContainer = document.getElementById("petByOwnerContainer");

async function renderAllPets(){
    const pets = state.allPets;
    if (pets == []){
        allPetsContainer.replaceChildren("");
    } else {
        const petCards = pets.map((pet) =>{
            const card = document.createElement('div');
            card.innerHTML =
                `<p>Name: ${pet.name}<p>
                <p>Owner: ${pet.owner}<p>
                <p>Age: ${pet.age}<p>
                <p>Breed: ${pet.breed}<p>
                <br>`;
            return card;
        });
    
        allPetsContainer.replaceChildren(...petCards);
    }
}

async function renderPetByName(){
    const pet = state.petByName;
    if (!pet){
        petByNameContainer.replaceChildren("");
    } else {
        const petCard = document.createElement('div');
        petCard.innerHTML =  `<p>Name: ${pet.name}<p>
                            <p>Owner: ${pet.owner}<p>
                            <p>Age: ${pet.age}<p>
                            <p>Breed: ${pet.breed}<p>`;
        petByNameContainer.replaceChildren(petCard);
    }
 
}

async function renderPetByOwner(){
    const pet = state.petByOwner;
    if (!pet){
        petByOwnerContainer.replaceChildren("");
    } else {
        const petCard = document.createElement('div');
        petCard.innerHTML =  `<p>Name: ${pet.name}<p>
        <p>Owner: ${pet.owner}<p>
        <p>Age: ${pet.age}<p>
        <p>Breed: ${pet.breed}<p>`;
        petByOwnerContainer.replaceChildren(petCard);
    }
}

function renderMain(){
    const allPetsButton = document.createElement("button");
    allPetsButton.innerText = "Render All Pets";
    allPetsButtonContainer.replaceChildren(allPetsButton);
    allPetsButton.addEventListener('click', getAllPets);

    renderAllPets();

    const petByNameForm = document.createElement("form");
    petByNameForm.innerHTML = `  
    <label>
    Pet Name
    <input type="text" name="name" />
    </label>
    <button id="petByNameSubmit">Submit</button>`;
    petByNameForm.addEventListener('submit', (event) => {
        getPetByName(event, event.target[0].value);
    });
    petByNameFormContainer.replaceChildren(petByNameForm);

    renderPetByName();

    const petByOwnerForm = document.createElement("form");
    petByOwnerForm.innerHTML = `  
    <label>
    Owner Name
    <input type="text" name="name" />
    </label>
    <button id="petByOwnerSubmit">Submit</button>`;
    petByOwnerForm.addEventListener('submit', (event) => {
        getPetByOwner(event, event.target[0].value);
    });
    petByOwnerFormContainer.replaceChildren(petByOwnerForm);

    renderPetByOwner();

}

renderMain();