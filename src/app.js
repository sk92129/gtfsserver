// core modules first
const path = require('path')
// npm module
const express = require('express')

const gtfs = require('gtfs')
const mongoose = require('mongoose')

const basedir = path.join(__dirname, '..')

const config = require(basedir + '/config/config.json')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })



console.log(__dirname)
console.log(__filename)
console.log(basedir + '/public')
const app = express()

// app.com domain 

// customize the server
app.use(express.static(basedir + '/public'))



app.get('/about', (request, response) => {
    response.send('<h1>About</h1>')
})


app.get('/stopsbyroute', (request, response) => {
    if (!request.query.agency){
        return response.send({
            error: 'You must provide agency in url'
        })
    }
    if (!request.query.routeid){
        return response.send({
            error: 'You must provide routeid in url'
        })
    }

    if (!request.query.direction){
        return response.send({
            error: 'You must provide direction in url'
        })
    }

        // Get all stops for a specific route and direction
    gtfs.getStops({
        agency_key: request.query.agency,
        route_id: request.query.routeid,
        direction_id: request.query.direction
    }).then(stops => {
        response.send(stops)
        
    });

})



app.get('/stopsbycircle', (request, response) => {
    if (!request.query.latitude){
        return response.send({
            error: 'You must provide latitude in url'
        })
    }
    if (!request.query.longitude){
        return response.send({
            error: 'You must provide longitude in url'
        })
    }

    if (!request.query.radius){
        return response.send({
            error: 'You must provide radius in url'
        })
    }

        // Get all stops for a specific route and direction
    gtfs.getStops({
        within: {
            lat: request.query.latitude,
            lon: request.query.longitude,
            radius: request.query.radius

        }
    }).then(stops => {
        response.send(stops)
        
    });

})


app.get('/stoptimes', (request, response) => {
    if (!request.query.agency){
        return response.send({
            error: 'You must provide agency in url'
        })
    }
    if (!request.query.stopid){
        return response.send({
            error: 'You must provide stopid in url'
        })
    }
        // Get all stops for a specific route and direction
    gtfs.getStoptimes({
        agency_key: request.query.agency,
        stop_id: request.query.stopid
    }).then(stoptimes => {
        response.send(stoptimes)
        
    });
})

app.get('/stoptimeswithroute', (request, response) => {
    if (!request.query.agency){
        return response.send({
            error: 'You must provide agency in url'
        })
    }
    if (!request.query.stopid){
        return response.send({
            error: 'You must provide stopid in url'
        })
    }
    if (!request.query.routeid){
        return response.send({
            error: 'You must provide routeid in url'
        })
    }
    if (!request.query.direction){
        return response.send({
            error: 'You must provide direction in url'
        })
    }

        // Get all stops for a specific route and direction
    gtfs.getStoptimes({
        agency_key: request.query.agency,
        stop_id: request.query.stopid,
        route_id: request.query.routeid,
        direction_id: request.query.direction
    }).then(stoptimes => {
        response.send(stoptimes)
        
    });
})




app.get('/routes', (request, response) => {
    if (!request.query.agency){
        return response.send({
            error: 'You must provide agency in url'
        })
    }
    console.log(request.query.agency)
    gtfs.getRoutes({
        agency_key: request.query.agency
      }).then(routes => {
        console.log('Number of routes: '+ routes.length)   
        response.send(routes)
      });    
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})