define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "/Users/vilanya/Documents/code/SIT209/TrackMe/mqtt/public/generated-docs/main.js",
    "groupTitle": "/Users/vilanya/Documents/code/SIT209/TrackMe/mqtt/public/generated-docs/main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/send-command",
    "title": "Device send a command",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n    \"published new message\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: ",
          "content": "{\n    \"Device does not exist\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mqtt.js",
    "groupTitle": "Device",
    "name": "PostSendCommand"
  },
  {
    "type": "put",
    "url": "/sensor-data",
    "title": "Device sensor-data",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n    \"published new message\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: ",
          "content": "{\n    \"Device does not exist\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./mqtt.js",
    "groupTitle": "Device",
    "name": "PutSensorData"
  }
] });
