const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const invModel = require("../models/inventory-model")
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
    let classification = await invModel.getClassifications();
    let inventoryList = await utilities.getInv();
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("management/add-Classification", {
            errors,
            title: "Add Classification",
            nav,
            flash: req.flash(),
            classification_name,
            classification,
            inventoryList,
        })
        return;
    }
    next();
}






/*  **********************************
 *  New Vehicle Data Validation Rules
 * ********************************* */
validate.newVehicleRules = () => {
    return [
        body("inv_classification")
            .trim()
            .isNumeric()
            .withMessage("Please provide a valid classification ID."),
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a make."),
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a model."),
        body("inv_year")
            .trim()
            .isNumeric()
            .withMessage("Please provide a valid year."),
        body("inv_description")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a description."),
        body("inv_image")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide an image path."),
        body("inv_thumbnail")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a thumbnail path."),
        body("inv_price")
            .trim()
            .isNumeric()
            .withMessage("Please provide a valid price."),
        body("inv_miles")
            .trim()
            .isNumeric()
            .withMessage("Please provide a valid number of miles."),
        body("inv_color")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Please provide a color."),
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
        inv_color,
        inv_classification,
    } = req.body;
    let classifications = await invModel.getClassifications();//new
    let inventoryList = await utilities.getInv();//new
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        // res.render("management/add-Inventory", {
        res.render("inventory/add-Inventory", {
            errors,
            title: "Add Vehicles",
            nav,
            classifications,
            inventoryList,
            flash: req.flash(),
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            inv_classification,
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
        inv_color,
        classification_id,
    } = req.body

    let classification = await invModel.getClassifications();
    let inventoryList = await utilities.getInv();
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit " + itemName,
            nav,
            classification,
            inventoryList,
            flash: req.flash(),
            inv_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
        })
        return
    }
    next()
}

module.exports = validate