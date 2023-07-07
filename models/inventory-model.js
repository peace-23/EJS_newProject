const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get inventory item by Id
 * ************************** */
async function getInventoryByinventoryId(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      WHERE i.inv_id = $1`,
      [inventory_id]
    )
    return data.rows
  } catch (error) {
    console.error("getinventorysbyid error " + error)
  }
}

// +++++++++++++++++++++++++++++
// MAMAGEMENT



/* **************************************
*   Register new classification
* *************************************/
async function registerClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}


/* ****************************************
*   Check for existing Classification
* *************************************** */
async function checkExistingClassification(classification_name) {
  try {
    const sql = "SELECT * FROM classification WHERE classification_name = $1"
    const class_name = await pool.query(sql, [classification_name])
    return class_name.rowCount
  } catch (error) {
    return error.message
  }
}


/* **************************************
*   Register new vehicle
* *************************************/
async function registerNewVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) {
    try {
      const sql = "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
      return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color])
    } catch (error) {
      return error.message
    }
  }
  
  
  
  /* ****************************************
  *   Check for existing vehicle
  * *************************************** */
  async function checkExistingVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) {
    try {
      const sql = "SELECT * FROM public.inventory WHERE (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) = $1, $2, $3, $4, $5, $6, $7, $8, $9"
      const email = await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color])
      return email.rowCount
    } catch (error) {
      return error.message
    }
  }
  


module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByinventoryId, registerClassification, checkExistingClassification, registerNewVehicle,checkExistingVehicle};