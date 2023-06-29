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
  const vehicleName = data[0].inv_make +" " + data[0].inv_model + " " + data[0].inv_year
  res.render("./inventory/inventory", {
    title: vehicleName,
    nav,
    grid,
  })
}
module.exports = invCont