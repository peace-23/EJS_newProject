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
  let classifications = await invModel.getClassifications();
  const classificationSelect = await utilities.buildClassificationList(classifications.rows)
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    flash: req.flash(),
    errors: null,
    classificationSelect
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
    flash: req.flash(),
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
  try {
    if (regResult) {
      let nav = await utilities.getNav()
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${classification_name}.`
      )
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        classification,
        flash: req.flash(),
        errors: null,
      })
    } else {

      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("inventory/add-Classification", {
        title: "Add Classification",
        nav,
        flash: req.flash(),
        errors: null,
      })
    }
  } catch (error) {
    console.error("addClassification error: ", error);
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification - Error",
      nav,
      flash: req.flash(),
      errors: null,
    });
  }
}



/* ****************************************
*  Deliver Add New Vehicle view
* *************************************** */
invCont.buildAddVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classification = await invModel.getClassifications();
  let inventoryList = await utilities.getInv();
  // req.flash("notice", "This is a flash message.")
  res.render("inventory/add-Inventory", {
    title: "Add Vehicle",
    nav,
    classification,
    inventoryList,
    flash: req.flash(),
    errors: null,
  })
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
  try {
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered!.`
      )
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        classification,
        flash: req.flash(),
        errors: null,
      })
    } else {
      req.flash("notice", "Sorry, your registration was not successful.")
      res.status(501).render("inventory/add-Inventory", {
        title: "Add Vehicle",
        nav,
        classification,
        inventoryList,
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
        flash: req.flash(),
        errors: null,
      })
    }
  } catch (error) {
    console.error("addInventory error: ", error);
    req.flash("notice", 'Sorry, there was an error processing the inventory.')
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory - Error",
      nav,
      classification,
        inventoryList,
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
      flash: req.flash(),
      errors: null,
    });
  }
};



/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}





/* ****************************************
*  This will build the "edit inventory" view
* *************************************** */
invCont.buildEditView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByinventoryId(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("/inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    flash: req.flash(),
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}




/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      inventoryList,
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
      flash: req.flash(),
      errors: null,
      
    })
  }
}





/* ****************************************
*  This will build the "delete inventory" view
* *************************************** */
invCont.buildDeleteView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByinventoryId(inv_id)
  // const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("/inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    // classificationSelect: classificationSelect,
    flash: req.flash(),
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
    // classification_id: itemData.classification_id
  })
}




/* ***************************
 *  Delete Inventory Data
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.body.inv_id)
  const deleteResult = await invModel.deleteInventoryItem(inv_id)
  if (deleteResult) {
    req.flash("notice", `The ${itemName} was successfully deleted.`)
    res.redirect('/inv/')
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    // res.redirect("/inv/delete/inv_id")
          res.status(501).render("/inv/")
  }

  // if (deleteResult) {
  //   const itemName = deleteResult.inv_make + " " + deleteResult.inv_model
  //   req.flash("notice", `The ${itemName} was successfully deleted.`)
  //   res.redirect("/inv/")
  // } else {
  //   const classificationSelect = await utilities.buildClassificationList(classification_id)
  //   const itemName = `${inv_make} ${inv_model}`
  //   req.flash("notice", "Sorry, the insert failed.")
  //   res.status(501).render("inventory/delete-confirm", {
  //     title: "Delete " + itemName,
  //     nav,
  //     errors: null,
  //     inv_id
  //   })
}







module.exports = invCont