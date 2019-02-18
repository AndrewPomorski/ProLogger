# Pro Logger
![Size](https://img.shields.io/github/size/andrewpomorski/prologger/dist/prologger.min.js.svg?style=flat-square)
![License](https://img.shields.io/github/license/AndrewPomorski/ProLogger.svg?style=flat-square)

## About

ProLogger is an attempt to create a more robust, hackable logging solution for Javascript.

✅ Features:

 - Configurable color schemes
 - 5 levels of logs (TRACE, DEBUG, INFO, WARN, ERROR)
 - Writing to log files
 - Inserting custom elements to message template (for example API keys for easier logs parsing)
 - Silencing
 - Verbose mode

📝 Some of the **upcoming** features I have in mind:
 
 - Editing message templates
 - Logstash support
 - Silencing on a per-level basis
 - TypeScript support
 - File size optimization
 - Removing unnecessary dependancies
 - Browser support


The underlying concept behind ProLogger is to make it as fully-featured as possible without adding too much overhead to something as basic as logging. 
The minified file is only **3.8K** small, however the goal is to go under 2KB and dependancy-free. Right now ProLogger uses amazing [chalk](https://github.com/chalk/chalk) library to print beautiful and readable messages.

## Usage

### Initialization 
To get ProLogger just clone this repository (it will be published to npm eventually)

Usage is very simple, after cloning the package just include ```prologger.js``` in your javascript file (you can also use ```prologger.min.js```)

```javascript
const Prologger = require('prologger/dist/prologger');
const LOGGER = new Prologger();
```

You can also pass a config object:

```javascript
var options = {
    loggerName: 'Test logger',
    logToFile: false,
    logFilePath: "./log.js",
    verbose: true,
    capturable: true,
    customColors: false,
    captureMessage: "[API KEY]"
};
```

The capture message is supposed to be a custom message added to log output to make it easier to search for only those messages you want to utilize.


### Logging

After that's done, you have 5 levels of logs at your disposal:

- TRACE
- DEBUG
- INFO
- WARN
- ERROR


The logging calls are made by simply using:

```javascript
LOGGER.info('info message');
LOGGER.warn('warn message');
LOGGER.trace('trace message');
LOGGER.debug('debug message');
LOGGER.error('error message');
```


or 

```javascript
LOGGER.log("<LEVEL>", "<message>");
```


The colors for each level can be configured by edditing ```.loggerconfig.json``` file:

```json
{
    "colorCodes": {
        "trace": "#377833",
        "debug": "#377833",
        "info": "#377833",
        "warn": "#377833",
        "error": "#ff4500"
    }
}
```

Eventually, more and more things will become configurable through that file, so keeping it will be justified

#### Other utilities

Logs can be either **silenced** by calling

```javascript
LOGGER.silence(true);
```

**verbose** mode can be toggled by calling

```javascript
LOGGER.verbose(true);
```

**capture message** can be changed either through config object or at runtime by calling:

```javascript
LOGGER.setCaptureMessage("YOUR CAPTURE MESSAGE");
```







