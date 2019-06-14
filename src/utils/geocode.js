const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJpNWRhbnRlIiwiYSI6ImNqdWpvanltODBqZGc0ZG5xY2h6cTc5OHIifQ.GxvP4QncRVKqBU0hoX8R-Q';

    request({ url, json: true }, (error, { body: { features } = {} } = {}) => {
        if (error) {
            callback("Unable to connect to location services!", undefined)
        } else if (features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, {
                location: features[0].place_name,
                latitude: features[0].center[1],
                longitude: features[0].center[0]
            })
        }
    })
}

module.exports = geocode;