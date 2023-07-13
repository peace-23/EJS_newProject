const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
// const managementModel = require("../models/management-model")



/*  **********************************
 *  New Classifcation Data Validation Rules
 * ********************************* */
validate.newClassificationRules = () => {
    return [
        // classification name is required and must be string
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a classification name."), // on error this message is sent.

    ]
}


/* ******************************
* Check data and return errors or continue to registration
* ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("management/add-Classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}






/*  **********************************
 *  New Vehicle Data Validation Rules
 * ********************************* */
validate.newVehicleRules = () => {
    return [
        // vehicle make is required and must be string
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide make of vehicle."), // on error this message is sent.

        // Model of vehicle is required and must be string
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide model of vehicle."), // on error this message is sent.

        // Year of vehicle is required and must be integer
        body("inv_year")
            .trim()
            .isLength({ int: 4 })
            .withMessage("Please provide vehicle year."), // on error this message is sent.

        // valid email is required and cannot already exist in the DB
        // body("account_email")
        //     .trim()
        //     .isEmail()
        //     .normalizeEmail() // refer to validator.js docs
        //     .withMessage("A valid email is required.")
        //     .custom(async (account_email) => {
        //         const emailExists = await accountModel.checkExistingEmail(account_email)
        //         if (emailExists) {
        //             throw new Error("Email exists. Please log in or use different email")
        //         }
        //     }),

        // password is required and must be strong password
        // body("account_password")
        //     .trim()
        //     .isStrongPassword({
        //         minLength: 12,
        //         minLowercase: 1,
        //         minUppercase: 1,
        //         minNumbers: 1,
        //         minSymbols: 1,
        //     })
        //     .withMessage("Password does not meet requirements."),
    ]
}


/* *******************************************************
* Check data and return errors or continue to registration
* ******************************************************** */
validate.checkvehicleData = async (req, res, next) => {
    const {
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
    } = req.body

    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("management/add-Inventory", {
            errors,
            title: "Add Vehicle",
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color
        })
        return
    }
    next()
}



/* *******************************************************
* Check data and errors will be directed back to the edit view
* ******************************************************** */
validate.checkUpdateData = async (req, res, next) => {
    const {
        inv_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
    } = req.body

    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit " + itemName,
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            inv_id,
        })
        return
    }
    next()
}

module.exports = validate