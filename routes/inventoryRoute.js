// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const regValidate = require("../utilities/management-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByinventoryId));


// Process the new classification data
router.post('/add-Classification', regValidate.newClassificationRules(), regValidate.checkClassificationData, utilities.handleErrors(invController.registerClassification))

// Process the new classification attempt
router.get( "/add-Classification", utilities.handleErrors(invController.buildAddClassification))


// Process the new vehicle data
router.post('/add-Inventory', regValidate.newVehicleRules(), regValidate.checkvehicleData, utilities.handleErrors(invController.registerNewVehicle))

// Process the new vehicle attempt
router.get("/add-Inventory", utilities.handleErrors(invController.buildAddVehicle))

// Process the new vehicle attempt
router.get("/", utilities.handleErrors(invController.buildVehicleManagement))



module.exports = router;