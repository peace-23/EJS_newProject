// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')



// Route to build account by login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));//correct


// Process the login request
router.post(
  "/login", //(req, res)=>{console.log("show me my result!" + JSON.stringify(req.body))}
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)//correct
)


router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));//correct

// Process the registration data
router.post('/register', regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))//correct


// test
router.get('/logout', utilities.handleErrors(accountController.accountLogout));

router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountUpdate)
);

router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkUpdatedData,
  utilities.handleErrors(accountController.accountUpdate)
);

router.post(
  "/change-password",
  utilities.checkLogin,
    regValidate.changePasswordRules,
  utilities.handleErrors(accountController.changePassword)
);


router.get("/delete-confirm/:account_id",
    utilities.checkLogin,
    utilities.handleErrors(accountController.deleteAccount)
)

router.post("/delete-confirm/",
    utilities.checkLogin,
    utilities.handleErrors(accountController.removeAccount)
)




// Route to build account by Management view
router.get("/accountManagement", utilities.handleErrors(accountController.buildManagement));

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

module.exports = router;