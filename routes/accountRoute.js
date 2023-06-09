// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')



// Route to build account by login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));


// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)


// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process the registration data
router.post('/register', regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))





// Route to build account by Management view
router.get("/management", utilities.handleErrors(accountController.buildManagement));

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

module.exports = router;