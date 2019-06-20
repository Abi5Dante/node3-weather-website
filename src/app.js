const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialsPaths = path.join(__dirname, '../templates/partials');

// setup handler locations
app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialsPaths)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Abi',
        age: 24,
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Abi',
        title: 'Nothing about me',
        about: 'a flower'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Abi',
        title: 'Help',
        helpbox: 'help me please'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address term"
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, { summary, temperature, precipProbability } = {}) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                location,
                summary,
                temperature,
                precipProbability,
                high,
                low
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "serach query not provided"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: 'Abi Showkath',
        title: 'Error',
        message: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: 'Abi',
        title: 'Error',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port',port)
})