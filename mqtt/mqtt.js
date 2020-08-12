const mqtt = require('mqtt');
const express = require('express');

const randomCoordinates = require('random-coordinates');
const rand = require('random-int');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const bodyParser = require('body-parser'); 

const app = express();

app.use(express.static('public'));
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
});

const port = process.env.PORT || 5001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
  extended: true
}));

const Device = require('./models/device');

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => { 
    console.log('mqtt connected');
    client.subscribe('/sensorData');
});

client.on('message', (topic, message) => { 
    if (topic == '/sensorData') {
        const data = JSON.parse(message);

        Device.findOne({"name": data.deviceId }, (err, device) => { 
            if (err) {
                console.log(err) 
            }

            const { sensorData } = device;
            const { ts, loc, temp } = data;

            sensorData.push({ ts, loc, temp }); 
            device.sensorData = sensorData;

            device.save(err => { 
                if (err) {
                    console.log(err) 
                }
            }); 
        });
    } 
});     

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => { 
    res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {post} /send-command Device send a command
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*   { 
*       "published new message"
*   }
* @apiErrorExample {json} Error-Response: 
*   {
*       "Device does not exist" 
*   }
*/

app.post('/send-command', (req, res) => { 
    const { deviceId, command } = req.body; 
    const topic = `/218664185/command/${deviceId}`; 
    client.publish(topic, command, () => {
        res.send('published new message'); 
    });
});



/**
* @api {put} /sensor-data Device sensor-data
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*   { 
*       "published new message"
*   }
* @apiErrorExample {json} Error-Response: 
*   {
*       "Device does not exist" 
*   }
*/

app.put('/sensor-data', (req, res) => { 
    const { deviceId } = req.body;

    const [lat, lon] = randomCoordinates().split(", "); 
    const ts = new Date().getTime();
    const loc = { lat, lon };
    const temp = rand(20, 50);

    const topic = '/sensorData';
    const message = JSON.stringify({ deviceId, ts, loc, temp });

    client.publish(topic, message, () => { 
        res.send('published new message');
    }); 
});

app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});

//     const topic = '/218664185/test/hello/'; 
//     const msg = 'Hello MQTT world!'; 
//     client.publish(topic, msg, () => {
//         console.log('message sent...'); 
// });


