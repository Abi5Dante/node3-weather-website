const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1b0067479f14a7e5a8db50c416cabf39/' + latitude + ',' + longitude + '?units=si';

    request({ url, json: true }, (error, { body, body: { daily, currently } } = {}) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined)
        } else if (body.error) {
            callback("Unable to get weather data. Try another search.", undefined)
        } else {
            callback(
                undefined, 
                'There is a ' 
                + daily.data[0].summary 
                + ' It is currently '
                + currently.temperature
                + ' degrees celcius '
                + ' High - ' + daily.data[0].temperatureHigh
                + ' Low - ' + daily.data[0].temperatureLow
                + '. There is a '
                + currently.precipProbability + '% chance of rain.'
            )
        }
    })
}

module.exports = forcast;