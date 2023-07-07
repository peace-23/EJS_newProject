const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByinventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByinventoryId(inventory_id)
  console.log(data)
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const vehicleName = data[0].inv_make + " " + data[0].inv_model + " " + data[0].inv_year
  res.render("./inventory/inventory", {
    title: vehicleName,
    nav,
    grid,
  })
}


/* ****************************************
*  Deliver vehicle management view
* *************************************** */
invCont.buildVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
  })
}

/* ****************************************
*  Deliver Add New Classification view
* *************************************** */

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/add-Classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver Add New Vehicle view
* *************************************** */
invCont.buildAddVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/add-Inventory", {
    title: "Add Vehicle",
    nav,
    errors: null,
  })
}



/* ****************************************
*  New Classification Process Registration
* *************************************** */

invCont.registerClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.registerClassification(
    classification_name
  )

  if (regResult) {
    let nav = await utilities.getNav()
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${classification_name}.`
    )
    res.status(201).render("inventory/management", {
      title: "Add Vehicle",
      nav,
      errors: null
    })
  } else {
    
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-Classification", {
      title: "Add Classification",
      nav,
      errors: null
    })
  }
}



/* ****************************************
*  New Vehicle Process Registration
* *************************************** */

invCont.registerNewVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color } = req.body

  const regResult = await invModel.registerNewVehicle(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color}.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inventory/add-Inventory", {
      title: "Add Vehicle",
      nav,
    })
  }
}


module.exports = invCont