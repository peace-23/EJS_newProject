const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

baseController.error = async function(req, res){
  throw new Error("test error")

  
}

module.exports = baseController
