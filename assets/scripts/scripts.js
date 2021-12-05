const addNewButton = document.querySelector("#add-record");
const backdrop = document.querySelector("#backdrop");
const form = document.querySelector("#form");

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

