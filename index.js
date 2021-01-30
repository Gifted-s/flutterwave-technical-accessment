const express = require('express')
const validateBody = require('./validateBody/validateBody')
const validateField = require('./validateField/validateField')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(helmet())
app.use(cors())


app.get('/', (req, res, next) => {
    res.status(200).send(rootResponse)
})

app.post('/validate-rule', (req, res) => {
    // First:  Check the JSON payload i.e request body
    const bodyIsInvalid = validateBody(req.body)

    // is request body invalid
    if (bodyIsInvalid) {

        // return error response with error body
        return res.status(400).send(bodyIsInvalid)
    }


    // Secondly: Check for the field to be validated
    const validateFieldResponse = validateField(req.body)

    // is field invalid
    if (! validateFieldResponse.status === "error") {

        //return error response with error body
        return res.status(400).send( validateFieldResponse)
    }
    // if all is well, return a success respose with the success body
    return res.status(200).send(validateFieldResponse)

})


const PORT = process.env.PORT || 3000
// server listens on port 3000 locally(development) or on port opened on the hosted server(production) 
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})








const rootResponse = {
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
        "name": "Adewumi Sunkanmi",
        "github": "@Gifted-s",
        "email": "sunkanmiadewumi1@gmail.com",
        "mobile": "07031850081",
        "twitter": "@ADEWUMISUNKANM5"
    }
}