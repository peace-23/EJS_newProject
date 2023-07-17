// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const regValidate = require("../utilities/management-validation")
// const Util = require("../utilities");



// Route to build inventory by classification view
router.get("/",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.buildVehicleManagement)
);


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));//correct
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByinventoryId));//correct

// Route to work with the inventory.js file
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));//correct




// Route to edit an inventory
router.get("/edit-inventory/:inv_id",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.buildEditView));//correct

// Route to handle the incoming request
router.post("/edit-inventory/",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.updateInventory));//correct




// Process the new classification attempt
router.get("/add-Classification",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.buildAddClassification)) //correct

// Process the new classification data
router.post('/add-Classification',
    utilities.checkLogin,
    utilities.checkClearance,
    regValidate.newClassificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.registerClassification))//correct




// Process the new vehicle data
router.post('/add-Inventory',
    utilities.checkLogin,
    utilities.checkClearance,
    regValidate.newVehicleRules(),
    regValidate.checkvehicleData,
    utilities.handleErrors(invController.registerNewVehicle))//correct

// Process the new vehicle attempt
router.get("/add-Inventory",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.buildAddVehicle))//correct





// Route to get an item for delete in inventory
router.get("/delete-confirm/:inv_id",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.buildDeleteView));//correct

// Route to handle the incoming delete request
router.post("/delete-confirm/",
    utilities.checkLogin,
    utilities.checkClearance,
    utilities.handleErrors(invController.deleteInventory));//correct



module.exports = router;