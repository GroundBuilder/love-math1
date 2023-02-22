// Let the DOM load and display the scores
/* document.addEventListener("DOMContentLoaded", function() {
    let myWins = localStorage.getItem('wins');
    let myLosses = localStorage.getItem('losses');

    // If local stoage has no values, set them to 0, otherwise display previous values
    if (localStorage.length === 0) {
      document.getElementById('last-win').innerText = 0;
      document.getElementById('last-lose').innerText = 0;
    } else {
    document.getElementById('last-win').innerText = myWins;
    document.getElementById('last-lose').innerText = myLosses;
  }
});*/

// Modals learned from https://www.w3schools.com/howto/howto_css_modals.asp
// Set variables to access the modal elements
let modal = document.getElementById("helpModal");
let btn = document.getElementById("instructions");
let exit = document.getElementById("close");

// Open the modal when the btn element is clicked
btn.onclick = function() {
  modal.style.display = "block";
};

// Close the modal when the 'x' button is clicked
exit.onclick = function() {
  modal.style.display = "none";
};

// Close the modal when anywhere outside the modal is clicked
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

