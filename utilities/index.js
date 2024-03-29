const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


Util.getInv = async function (req, res, next) {
  let data = await invModel.getInventory();
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + 'details"><img src="' + vehicle.inv_thumbnail
        + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the classification List HTML
* ************************************ */
Util.buildClassificationList = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<select id="myDropdown" name="Classification">'
    data.forEach((classification) => {
      grid += `<option value="${classification.classification_id}">${classification.classification_name}</option>`
    })
    grid += '</select>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the vehicle view HTML by id
* ************************************ */
Util.buildInventoryGrid = async function (data) {
  let grid
  if (data) {
    grid = '<div id="inv-display">'
    data.forEach(vehicle => {
      grid += '<div class="vehicleContainer">';

      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">';
      grid += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />';
      grid += '</a>'
      grid += '</div>';

      grid += '<div class="namePrice">';

      grid += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' ' + 'Details </h2>';
      grid += '<hr /><br>';
      grid += '<span class="price">Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span><br>';
      grid += '<p class="description"> <span>Description: </span>' + vehicle.inv_description + '</p><br>';

      grid += '<div class="details">';
      grid += '<span class="mileage">Mileage: </span>' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + ' miles<br>';
      grid += '<br><span class="color">Color: </span>' + vehicle.inv_color;
      grid += '</div>';



    });

    grid += '</div';
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}




/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    next()
  }
}

/* ****************************************
*  Check Login
* ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}


/* ****************************************
*  Check Login Clearance
* ************************************ */
Util.checkClearance = (req, res, next) => {
  const accountType = res.locals.accountData.account_type
  if(accountType !== "Admin" && accountType !== "Employee"){
    req.flash("You do not have permission to access this page.")
    return res.redirect("/account/login")
  } else {
    next()
  }
 }


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util