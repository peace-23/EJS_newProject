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



// ************************
// Form validation
// ************************
function validateForm() {
  // Get the classification name input value
  var classificationName = document.getElementById("classificationName").value;

  // Regular expression pattern to match against
  var pattern = /^[a-zA-Z0-9]+$/;

  // Check if the classification name contains any spaces or special characters
  if (!pattern.test(classificationName)) {
    // Display an error message
    document.getElementById("classificationNameError").textContent = "Invalid classification name. Only alphanumeric characters are allowed.";
    
    // Prevent form submission
    return false;
  }

  // Clear any existing error messages
  document.getElementById("classificationNameError").textContent = "";

  // Allow form submission
  return true;
}