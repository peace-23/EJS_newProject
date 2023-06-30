const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  // req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

// Function for error testing
baseController.error = async function(req, res){
  throw new Error("test error") 
}

module.exports = baseController
