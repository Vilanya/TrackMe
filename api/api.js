const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');

const app = express();

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

const Device = require('./models/device');

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});

app.get('/api/test', (req, res) => { 
    res.send('The API is working!');
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => { 
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {get} /api/devices AllDevices An array of all devices 
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*   [ 
*       {
*           "_id": "dsohsdohsdofhsofhosfhsofh",
*           "name": "Mary's iPhone",
*           "user": "mary",
*           "sensorData": [
*               {
*                   "ts": "1529542230",
*                   "temp": 12,
*                   "loc": {
*                       "lat": -37.84674,
*                       "lon": 145.115113
*               }
*              },
*               {
*                   "ts": "1529572230",
*                   "temp": 12,
*                   "loc": {
*                       "lat": -37.850026,
*                          "lon": 145.117683
*                   }
*               }
*           ]
*       }
*   ]
* @apiErrorExample {json} Error-Response: 
*   {
*       "User does not exist" 
*   }
*/

app.get('/api/devices', (req, res) => { Device.find({}, (err, devices) => {
    return err
    ? res.send(err)
    : res.send(devices);
    }); 
});

/**
* @api {post} /api/devices AllDevices Add new Device and Data
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*   {
*       successfully added device and data
*   }
* @apiErrorExample {json} Error-Response: 
*   {
*       "User does not exist" 
*   }
*/

app.post('/api/devices', (req, res) => { 
    const { name, user, sensorData } = req.body; 
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    newDevice.save(err => {
        return err
            ? res.send(err)
            : res.send('successfully added device and data');
    }); 
});

/**
* @api {post} /api/devices AllDevices Send Command
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*   { 
*       name: "Kev's Samsung", user: 'kev', sensorData: [] 
*   }
* @apiErrorExample {json} Error-Response: 
*   {
*       "User does not exist" 
*   }
*/
app.post('/api/send-command', (req, res) => { 
    console.log(req.body);
});

app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});