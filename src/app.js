const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define Paths for Express
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set handlebar engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ravi Parsana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ravi Parsana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ravi Parsana'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:  'You must provide an address!'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    location,
                    forecast: forecastdata,
                    address: req.query.address
                })   
              }) 
        })
    }
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help Article Not Found',
        name: 'Ravi Parsana'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Ravi Parsana'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})