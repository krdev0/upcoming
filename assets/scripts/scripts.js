const addNewButton = document.querySelector("#add-record");
const backdrop = document.querySelector("#backdrop");
const form = document.querySelector("#form");

const eventType = document.querySelector("#event-type");
const birthdayControl = document.querySelector("#birthday-control");
const namedayControl = document.querySelector("#nameday-control");
const otherControl = document.querySelector("#other-control");

eventType.addEventListener("change", showFormBasedOnSelect);

addNewButton.addEventListener("click", openUserForm);
backdrop.addEventListener("click", closeUserForm);

function openUserForm() {
    backdrop.style.display = "block";
    form.style.display = "block";
}

function closeUserForm() {
    backdrop.style.display = "none";
    form.style.display = "none";
}

function showFormBasedOnSelect(e) {
    const customSelectValue = e.target.value;

    if(customSelectValue === 'nameday') {
        birthdayControl.style.display = 'none';
        otherControl.style.display = 'none';
        namedayControl.style.display = 'block';
    }

    if(customSelectValue === 'birthday') {
        birthdayControl.style.display = 'block';
        namedayControl.style.display = 'none';
        otherControl.style.display = 'none';
    }

    if(customSelectValue === 'other') {
        birthdayControl.style.display = 'none';
        namedayControl.style.display = 'none';
        otherControl.style.display = 'block';
    }
}