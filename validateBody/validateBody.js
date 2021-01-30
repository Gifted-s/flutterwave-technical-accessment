const conditions = require("../conditions/conditions")

function validateBody(requestBody) {
    const { rule, data } = requestBody
    // checkout for invalid  payload
    if (!rule && !data) {
        return createErrorBody("Invalid JSON payload passed.")
    }
    // checking if rule field does not exist in the body passed
    if (!rule) {
        return createErrorBody("rule is required.")
    }
    //checking if data field does not exist in the request body passed
    if (!data) {
        return createErrorBody("data is required.")
    }
    // checking if type of rule is not an object
    if (typeof rule !== 'object') {
        return createErrorBody("rule should be an object.")
    }

    // checking if type of data is not an object,a string or an array which are the accepted data types
    if (typeof data !== 'object' && typeof data !== 'string' && !Array.isArray(data)) {
        return createErrorBody("data is required.")
    }

    // if rule field is an object then check if it has the required nested fields  which includes [field], [condition] and [condition_value], code below

    //check if [field] field does not exist in rule object
    if (!rule['field']) {
        return createErrorBody("rule.field is required.")
    }

    //check if [field] field type in rule object is not a string
    if (typeof rule['field'] !== 'string') {
        return createErrorBody("rule.field should be a string.")
    }
    // spilt [fieled] field in rule object
    let splitNested = rule.field.split('.')



    // we can only check if [field] field in rule exist in data if data is an object so we have to check if data is an object
    if (typeof data === 'object') {

        // check if [field] field in rule object is for nested field in data e.g mission.count
        if (splitNested.length === 2) {
            // first check for parent field for example if field is mission.count we have to check for mission field first then count field inside mssion  
            if (!data[splitNested[0]]) {
                return createErrorBody(`field ${splitNested[0]}.${splitNested[1]} is missing from data.`)
            }
            // check for inner field e.g if field mission.count,we check for count field
            if (!data[splitNested[0]][splitNested[1]]) {
                return createErrorBody(`field ${splitNested[0]}.${splitNested[1]} is missing from data.`)
            }
        }

         // check if [field] field in rule object is for single field e.g mission field in data object

        if(splitNested.length === 1){
            // check if the field specified in the rule object is missing from the data passed
            if (!data[rule.field]) {
                return createErrorBody(`field ${rule.field} is missing from data.`)
            }
        }
       

    }





    //check if [condition] field does not exist in rule object
    if (!rule['condition']) {
        return createErrorBody("rule.condition is required.")

    }
    // check if [condition] field type in rule object is a string
    if (typeof rule['condition'] !== 'string') {
        return createErrorBody("rule.condition should be a string.")

    }

    // check for  accepted condition values i.e 'eq', 'neq', 'gt', 'gte', 'contains'
    if (!conditions[rule['condition']]) {
      return   createErrorBody("rule.condition is required.")
    }
    //check if [condition_value] field does not exist in rule object
    if (! rule['condition_value']) {
        return createErrorBody("rule.condition_value is required.")
    }
 
    return null
}




function createErrorBody(message) {
    return {
        message,
        "status": "error",
        "data": null
    }
}


module.exports = validateBody
