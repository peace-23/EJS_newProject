const invModel = require("../models/inventory-model")
const Util = {}

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
* Build the vehicle view HTML by id
* ************************************ */
Util.buildInventoryGrid = async function (data) {
  let grid
  if (data) {
    grid = '<section id="inv-display">'
    data.forEach(vehicle => {
      grid += '<div class="vehicleContainer">';

      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">';
      grid += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />';
      grid += '</a>';
      grid += '</div>';

      grid += '<div class="namePrice">';

      grid += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' ' + 'Details </h2>';
      grid += '<hr />';
      grid += '<span class="price">Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span><br>';
      grid += '<p class="description">' + vehicle.inv_description + '</p>';

      grid += '<div class="details">';
      grid += '<span class="mileage">Mileage: ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + ' miles</span><br>';
      grid += '<span class="color">Color: ' + vehicle.inv_color + '</span>';
      grid += '</div>';



    });

    grid += '</section>';
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util