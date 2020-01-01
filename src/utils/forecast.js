const request = require('request')

const forecast = (latitude, longitude,  callback) =>{
    const url = 'https://api.darksky.net/forecast/cc31c6d0f1bbd1188f86ccc469ef93ea/'+latitude+','+longitude

    request({ url, json: true}, (error, {body}) => {
    if (error){
        callback('Unable to connect to weather service!', undefined)
    }else if (body.error) {
        callback('Error: '+ body.code + ' ' +body.error, undefined )
    }else{
        callback(undefined, body.daily.data[0].summary+' It is Currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain.')
    }   
})
}

module.exports = forecast