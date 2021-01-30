const conditions = require("../conditions/conditions")

function validateField(body) {
    const { rule, data } = body
    // check if data is an object, array is an object in javascript but we don't want it to appear as an object in this case
    let data_is_object = typeof data == 'object' && !Array.isArray(data)
    // spilt field incase of nested field
    let splitField = rule.field.split('.')
    const condition_option = rule.condition
    const condition_value = rule.condition_value





    switch (condition_option) {
        
        case conditions.eq: {
            // is data object
            if (data_is_object) {
                // is it a nested field, e.g mission.count 
                if (splitField.length === 2) {
                    const field_value = data[splitField[0]][splitField[1]]
                    // rule evaluation
                    if (field_value === condition_value) {
                        //return success
                        return createSuccessBody(field_value, rule)
                    }
                    //return error
                    return createErrorBody(field_value, rule)
                }
                // is it single field
                if (splitField.length === 1) {
                    const field_value = data[splitField[0]]
                    // rule evaluation
                    if (field_value === condition_value) {
                      //  return success
                        return createSuccessBody(field_value, rule)
                    }
                    // return error
                  return createErrorBody(field_value, rule)
                }

            }
            // this will run if data is not an object
            if (data === condition_value) {
                // return success
                return createSuccessBody(data, rule)
            }
            //return error
            return createErrorBody(data, rule)
        }







        case conditions.neq: {
            //is data object type
            if (data_is_object) {

                // is it a nested field, e.g mission.count 
                if (splitField.length === 2) {
                    const field_value = data[splitField[0]][splitField[1]]
                    // rule evaluation
                    if (field_value !== condition_value) {
                        // return success
                        return createSuccessBody(field_value, rule)
                    }
                    //return error
                    return createErrorBody(field_value, rule)
                }
                // is it a single field
                if (splitField.length === 1) {
                    const field_value = data[splitField[0]]
                    // rule evaluation
                    if (field_value !== condition_value) {
                         // return success
                        return createSuccessBody(field_value, rule)
                    }
                    // return error
                    return createErrorBody(field_value, rule)
                }

            }
            // this will run if data is not an object
            if (data !== condition_value) {
                // return success
                return createSuccessBody(data, rule)
            }
            // return error
            return createErrorBody(data, rule)
        }





     
        case conditions.gt: {
            // is data object type
            if (data_is_object) {
                // is it a nested field, e.g mission.count 
                if (splitField.length === 2) {
                    const field_value = data[splitField[0]][splitField[1]]
                    // rule evaluation
                    if (field_value > condition_value) {
                        // return success
                        return createSuccessBody(field_value, rule)
                    }
                    //return error
                    return createErrorBody(field_value, rule)
                }
                // is it a single field
                if (splitField.length === 1) {
                    const field_value = data[splitField[0]]
                    // rule evaluation
                    if (field_value > condition_value) {
                        //return success
                        return createSuccessBody(field_value, rule)
                    }
                    //return error
                    return createErrorBody(field_value, rule)
                }

            }
            // this will run if data is not an object
            if (data > condition_value) {
                // return success
                return createSuccessBody(data, rule)
            }
            // return error
            return createErrorBody(data, rule)

        }



        case conditions.gte: {
            //is data object type
            if (data_is_object) {
                // is it a nested field, e.g mission.count 
                if (splitField.length === 2) {
                    const field_value = data[splitField[0]][splitField[1]]
                    // rule evaluation
                    if (field_value >= condition_value) {
                        // return success
                        return createSuccessBody(field_value, rule)
                    }
                    // return error
                    return createErrorBody(field_value, rule)
                }
                // is it a single fleld
                if (splitField.length === 1) {
                    const field_value = data[[splitField[0]]]
                   // rule evaluation
                    if (field_value >= condition_value) {
                        // return success  // reur
                        return createSuccessBody(field_value, rule)
                    }
                      // return error
                    return createErrorBody(field_value, rule)
                }

            }
            // this will run if data is not an object
            if (data >= condition_value) {
                  // return success
                return createSuccessBody(data, rule)
            }
              // return error
            return createErrorBody(data, rule)

        }





        case conditions.contains: {
            function containItem(toFind, arr) {
                for (let i of arr) {
                    if (i === toFind) {
                        return true
                    }
                }
                return false
            }
            // is data object type
            if (data_is_object) {
                // is it a nested field, e.g mission.count 
                if (splitField.length === 2) {
                    const field_value = data[splitField[0]][splitField[1]]
                    // rule evaluation, we also have to check if field_value is an array else an error will be thrown
                    if (Array.isArray(field_value) && containItem(condition_value, field_value)) {
                         // return success
                        return createSuccessBody(field_value, rule)
                    }
                      // return error
                    return createErrorBody(field_value, rule)

                }
                // is it a single fleld
                if (splitField.length === 1) {
                    const field_value = data[splitField[0]]
                          // rule evaluation, we also have to check if field_value is an array else an error will be thrown
                    if (Array.isArray(field_value) && containItem(condition_value, field_value)) {
                          // return success
                        return createSuccessBody(field_value, rule)
                    }
                      // return error
                    return createErrorBody(field_value, rule)

                }

            }
            // this will run if data is not an object
            if (Array.isArray(data) && containItem(condition_value, data)) {
                   // return success
                return createSuccessBody(data, rule)
            }
              // return error
            return createErrorBody(data, rule)

        }
        default:
              // return error
            return createErrorBody(null, rule)
    }
}


// this function creates the error response body
function createErrorBody(field_value, rule) {
    return {
        "message": `field ${rule['field']} failed validation.`,
        "status": "error",
        "data": {
            "validation": {
                "error": true,
                "field": rule['field'],
                "field_value": field_value,
                "condition": rule['condition'],
                "condition_value": rule['condition_value']
            }
        }
    }

}

// this function creates the success response body
function createSuccessBody(field_value, rule) {
    return {
        "message": `field ${rule['field']} successfully validated.`,
        "status": "success",
        "data": {
            "validation": {
                "error": false,
                "field": rule['field'],
                "field_value": field_value,
                "condition": rule['condition'],
                "condition_value": rule['condition_value']
            }
        }

    }
}



module.exports = validateField