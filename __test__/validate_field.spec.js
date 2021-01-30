const validateField = require("../validateField/validateField")

describe('eq condition ', () => {
    // eq
    it('eq: must return successif data field  is equal to rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "name",
                "condition": "eq",
                "condition_value": "James Holden"
            },
            "data": {
                "name": "James Holden",
                "crew": "Rocinante",
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field name successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "name",
                    "field_value": "James Holden",
                    "condition": "eq",
                    "condition_value": "James Holden"
                }
            }
        }
        )
    })



    
    it('must return error if data field  is not equal to the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "name",
                "condition": "eq",
                "condition_value": "James Holden"
            },
            "data": {
                "name": "Nana memes",
                "crew": "Rocinante",
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field name failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "name",
                    "field_value": "Nana memes",
                    "condition": "eq",
                    "condition_value": "James Holden"
                }
            }
        }
        )
    })


    //eq on a nested field


    it('eq: must return success if data field  is equal to the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "mission.name",
                "condition": "eq",
                "condition_value": "lagos"
            },
            "data": {
                "mission": {
                    "name": "lagos"
                },
                "name": "James Holden",
                "crew": "Rocinante",
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field mission.name successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "mission.name",
                    "field_value": "lagos",
                    "condition": "eq",
                    "condition_value": "lagos"
                }
            }
        }
        )
    })
    // eq on a nested field
    it('eq: must return error if data field  is not equal to the  rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "mission.name",
                "condition": "eq",
                "condition_value": "lagos"
            },
            "data": {
                "mission": {
                    "name": "ogun"
                },
                "name": "James Holden",
                "crew": "Rocinante",
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field mission.name failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "mission.name",
                    "field_value": "ogun",
                    "condition": "eq",
                    "condition_value": "lagos"
                }
            }
        }
        )
    })


})























describe('neq condition ', () => {
    // neq
    it('neq: must return success if data field  is not equal rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "neq",
                "condition_value": 30
            },
            "data": {
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "age",
                    "field_value": 34,
                    "condition": "neq",
                    "condition_value":30
                }
            }
        }
        )
    })



    //neq
    it('neq: must return error if data field  is equal to the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "neq",
                "condition_value": 30
            },
            "data": {
                "age": 30,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "age",
                    "field_value": 30,
                    "condition": "neq",
                    "condition_value": 30
                }
            }
        }
        )
    })


    // neq on a nested field
    it('neq: must return success if  data field  is not equal to the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "measure.value",
                "condition": "neq",
                "condition_value": 30
            },
            "data": {
                "measure":{
                    "value":34
                }
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field measure.value successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "measure.value",
                    "field_value": 34,
                    "condition": "neq",
                    "condition_value": 30
                }
            }
        }
        )
    })
    // neq on a nested field
    it('neq: must return error if data field  is equal to the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "measure.value",
                "condition": "neq",
                "condition_value": 30
            },
            "data": {
                "measure":{
                    "value":30
                }
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field measure.value failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "measure.value",
                    "field_value": 30,
                    "condition": "neq",
                    "condition_value": 30
                }
            }
        }
        )
    })


})




















describe('gt condition ', () => {
    // gt
    it('gt: must return success if data field  is greater than the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "gt",
                "condition_value": 30
            },
            "data": {
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "age",
                    "field_value": 34,
                    "condition": "gt",
                    "condition_value":30
                }
            }
        }
        )
    })



    //gt
    it('gt: must return error if data field  is lesser than the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "gt",
                "condition_value": 30
            },
            "data": {
                "age": 20,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "age",
                    "field_value": 20,
                    "condition": "gt",
                    "condition_value": 30
                }
            }
        }
        )
    })


    // gt on a nested field
    it('gt: must return success if data field  is greater than the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "measure.value",
                "condition": "gt",
                "condition_value": 30
            },
            "data": {
                "measure":{
                    "value":34
                }
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field measure.value successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "measure.value",
                    "field_value": 34,
                    "condition": "gt",
                    "condition_value": 30
                }
            }
        }
        )
    })
    // gt on a nested field
    it('gt: must return error if data field  is lesser than the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "measure.value",
                "condition": "gt",
                "condition_value": 30
            },
            "data": {
                "measure":{
                    "value":10
                }
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field measure.value failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "measure.value",
                    "field_value": 10,
                    "condition": "gt",
                    "condition_value": 30
                }
            }
        }
        )
    })


})























describe('gte condition ', () => {
    // gte
    it(' must return success if  data field  is greater than the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "gte",
                "condition_value": 30
            },
            "data": {
                "age": 34,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "age",
                    "field_value": 34,
                    "condition": "gte",
                    "condition_value":30
                }
            }
        }
        )
    })

    it(' must return success if rule [condition_value] field is equal to the  data field', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "gte",
                "condition_value": 30
            },
            "data": {
                "age": 30,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "age",
                    "field_value": 30,
                    "condition": "gte",
                    "condition_value":30
                }
            }
        }
        )
    })


    it(' must return error if data field is lesser than the rule [condition_value]  ', () => {
        const fakeBody = {
            "rule": {
                "field": "age",
                "condition": "gte",
                "condition_value": 30
            },
            "data": {
                "age": 20,
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field age failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "age",
                    "field_value": 20,
                    "condition": "gte",
                    "condition_value": 30
                }
            }
        }
        )
    })


    // gte on a nested field
    it('gte: must return success if data field is greater than the rule [condition_value]  ', () => {
        const fakeBody = {
            "rule": {
                "field": "measure.value",
                "condition": "gte",
                "condition_value": 30
            },
            "data": {
                "measure":{
                    "value":34
                }
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field measure.value successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "measure.value",
                    "field_value": 34,
                    "condition": "gte",
                    "condition_value": 30
                }
            }
        }
        )
    })
    // gte on a nested field
    it('gte: must return error if data field  is lesser than the rule [condition_value] field', () => {
        const fakeBody = {
            "rule": {
                "field": "measure.value",
                "condition": "gte",
                "condition_value": 30
            },
            "data": {
                "measure":{
                    "value":10
                }
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field measure.value failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "measure.value",
                    "field_value": 10,
                    "condition": "gte",
                    "condition_value": 30
                }
            }
        }
        )
    })
})








describe('contains condition ', () => {
    
    it('must return success if data field contains the condition_value', () => {
        const fakeBody = {
            "rule": {
                "field": "scores",
                "condition": "contains",
                "condition_value": 30
            },
            "data": {
                "scores":[40,50,30,10]
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field scores successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "scores",
                    "field_value": [40,50,30,10],
                    "condition": "contains",
                    "condition_value": 30
                }
            }
        }
        )
    })



   
    it('must return error if data field does not contain the condition_value', () => {
        const fakeBody = {
            "rule": {
                "field": "scores",
                "condition": "contains",
                "condition_value": 80
            },
            "data": {
                "scores":[40,50,30,10]
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field scores failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "scores",
                    "field_value": [40,50,30,10],
                    "condition": "contains",
                    "condition_value": 80
                }
            }
        }
        )
    })


    //contains on a nested field

    it('must return success if data field contains the condition_value', () => {
        const fakeBody = {
            "rule": {
                "field": "student.scores",
                "condition": "contains",
                "condition_value": 30
            },
            "data": {
                "student":{
                    "scores":[40,50,30,10]
                }
               
            }
        }

        expect(validateField(fakeBody)).toMatchObject({
            "message": "field student.scores successfully validated.",
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": "student.scores",
                    "field_value": [40,50,30,10],
                    "condition": "contains",
                    "condition_value": 30
                }
            }
        }
        )
    })





   
    it('must return error if data field does not contain the condition_value', () => {
        const fakeBody = {
            "rule": {
                "field": "student.scores",
                "condition": "contains",
                "condition_value": 80
            },
            "data": {
                "student":{
                  "scores":[40,50,30,10]
                }
                
            }
        }
        expect(validateField(fakeBody)).toMatchObject({
            "message": "field student.scores failed validation.",
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": "student.scores",
                    "field_value": [40,50,30,10],
                    "condition": "contains",
                    "condition_value": 80
                }
            }
        }
        )
    })


})

