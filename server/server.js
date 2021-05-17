const { request, response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Data = require('./models/stickyNote')
const bodyParser = require('body-parser')

require('dotenv').config('./.env');

//Update settings for Mongoose
mongoose.set('useNewUrlParser', true) 
mongoose.set('useUnifiedTopology', true)

// Connect to database
mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('Connected to DB')
}).on('error', (error) => {
    console.log('Failed to connect to DB' + error)
})

app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

// Allow CORS 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}
app.use(allowCrossDomain)
  
// Gets all database items
app.get('/', (request, response) => {
    Data.find({}).then((DBitems) => {
        response.send(DBitems)
    })
})

app.post('/create', async (request, response) => {

    const body = request.body

    var note = new Data({
        content: body.content,
        date: body.date,
    })

    note.save().then(() => {
        if (note.isNew == false) {
            console.log('Saved')
            response.send('Saved data!')
        }
        else {
            console.log('Failed to save data')
        }
    })

})

app.post('/update', (request, response) => {
    const body = request.body
    Data.findOneAndUpdate({
        _id: body._id
    }, {
        content: body.content,
        posX: body.posX,
        posY: body.posY
    }, (err) => {
        if(err) {
            console.log('Failed to update ' + err)
        }
    })

    response.send('Updated')
})

app.post('/delete', (request, response) => {
  console.log(request.body._id)
    Data.findByIdAndDelete({
        _id: request.body._id
    }, (err) => {
        if(err) {
            console.log('Failed to delete ' + err)
        }
    })
    response.send('Deleted')
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
