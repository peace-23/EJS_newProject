// *************************************************************************
// This provides functionality to togglefrom show password to hide password
// *************************************************************************

const showpswd = document.querySelector("#showpswd");
showpswd.addEventListener("click", function () {
  const pswdInput = document.getElementById("pword");
  const type = pswdInput.getAttribute("type");
  if (type == "password") {
    pswdInput.setAttribute("type", "text");
    showpswd.innerHTML = "Hide Password";
  } else {
    pswdInput.setAttribute("type", "password");
    showpswd.innerHTML = "Show Password";
  }
});




// ******************************************************************
// This function is for the dropdown list of all the classifications
// ******************************************************************
// inv_make,  var dropdown = document.getElementById("myDropdown");

// Fetch options from the server and populate the dropdown
fetch('../navigation')
  .then(response => response.json())
  .then(data => {
    data.forEach(option => {
      var optionElement = document.createElement('option');
      optionElement.value = option.id;
      optionElement.textContent = option.name;
      dropdown.appendChild(optionElement);
    });
  })
  .catch(error => {
    console.error('Error fetching options: ' + error);
  });

dropdown.addEventListener("change", function () {
  var selectedOption = dropdown.value;
  console.log("Selected option: " + selectedOption);
});
