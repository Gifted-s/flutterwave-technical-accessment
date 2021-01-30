const validateBody = require('../validateBody/validateBody')
describe('validate request body', ()=>{
 it('must return (Invalid JSON payload passed.) if invalid json payload was passed', ()=>{
    const fakeBody = {
        a:1,
        b:2,
        c:3
    }
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"Invalid JSON payload passed.",
        "status": "error",
        "data": null
    
    })
 })


 it('must return (rule is required.) if rule field was not passed', ()=>{
    const fakeBody = {
        "data": {
          "name": "James Holden"
          }
        }
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule is required.",
        "status": "error",
        "data": null
    })
 })



 it('must return (data is required.) if data field was not passed', ()=>{
    const fakeBody = {
        "rule": {
          "field": "missions.count",
          "condition": "gte",
          "condition_value": 30
        }
        }
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"data is required.",
        "status": "error",
        "data": null
    })
 })



 it('must return (rule should be an object.) if typeof rule field is not an object', ()=>{
    const fakeBody = {
        "rule": 1,
          "data":{
              "name":'sunkanmi'
          }
        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule should be an object.",
        "status": "error",
        "data": null
    })
 })


 it('must return (data is required.) if typeof data field is not an object, array or string', ()=>{
    const fakeBody = {
        "rule": {
            "field": "missions.count",
            "condition": "gte",
            "condition_value": 30
          },
          "data":1

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"data is required.",
        "status": "error",
        "data": null
    })
 })



 it('must return (rule.field is required.) if [fleid] field is not in rule object', ()=>{
    const fakeBody = {
        "rule": {
            "condition": "gte",
            "condition_value": 30
          },
          "data":{
              "name":'sunkanmi'
          }

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule.field is required.",
        "status": "error",
        "data": null
    })
 })

 it('must return (rule.field should be a string.) if typeof [fleid] field in rule object is not a string', ()=>{
    const fakeBody = {
        "rule": {
            "field":[1,2,3],
            "condition": "gte",
            "condition_value": 30
          },
          "data":{
              "name":'sunkanmi'
          }

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule.field should be a string.",
        "status": "error",
        "data": null
    })
 })


 // test for single field 
 it('must return (field name is missing from data.) if the field specified in the rule is not in the data object', ()=>{
    const fakeBody = {
        "rule": {
            "field":"name",
            "condition": "gte",
            "condition_value": 30
          },
          "data":{
              "age":12
          }

        }
        
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"field name is missing from data.",
        "status": "error",
        "data": null
    })
 })

  // test for nested field field 
  it('must return (field mission.count is missing from data.) if the field specified in the rule is not in the data object', ()=>{
    const fakeBody = {
        "rule": {
            "field":"mission.count",
            "condition": "gte",
            "condition_value": 30
          },
          "data":{
              "mission":{
                  "name":"testing"
              }
          }

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"field mission.count is missing from data.",
        "status": "error",
        "data": null
    })
 })

 it('must return (rule.condition is required.) if [condition] field is not in rule object', ()=>{
    const fakeBody = {
        "rule": {
            "field":"name",
            "condition_value": 30
          },
          "data":{
              "name":'sunkanmi'
          }

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule.condition is required.",
        "status": "error",
        "data": null
    })
 })



 it('must return (rule.condition is required.) if [condition] field is not among the condition options i.e eq, neq, gt, gte, contains', ()=>{
    const fakeBody = {
        "rule": {
            "field":"name",
            "condition":"invalid_condition",
            "condition_value": 30
          },
          "data":{
              "name":'sunkanmi'
          }

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule.condition is required.",
        "status": "error",
        "data": null
    })
 })


 it('must return (rule.condition_value is required.) if [condition_value] field is not in rule object', ()=>{
    const fakeBody = {
        "rule": {
            "field":"name",
            "condition":"eq",
          },
          "data":{
              "name":'sunkanmi'
          }

        }
        
      
    expect(validateBody(fakeBody)).toMatchObject({
        "message":"rule.condition_value is required.",
        "status": "error",
        "data": null
    })
 })



})


