const showpswd = document.querySelector("#showpswd");
showpswd.addEventListener("click", function () {
    const pswdInput = document.getElementById("password");
    const type = pswdInput.getAttribute("type");
    if (type == "password") {
        pswdInput.setAttribute("type", "text");
        showpswd.innerHTML = "Hide Password";
    } else {
        pswdInput.setAttribute("type", "password");
        showpswd.innerHTML = "Show Password";
    }
});