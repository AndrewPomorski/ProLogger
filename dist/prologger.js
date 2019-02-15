"use strict";
/*
The MIT License

Copyright (c) 2019 Andrew Pomorski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var LightLogger = /** @class */ (function () {
    function LightLogger(loggerName, logToFile, logFilePath, verbose, capturable, customColors) {
        this.logFilePath = './log.json';
        this.logObject = [];
        this.errorLevels = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"];
        this.isSilent = false;
        this.isVerbose = false;
        this.customColors = true;
        this.configFileName = './.loggerconfig.json';
        this.messageColors = {
            trace: '#1e90ff',
            debug: '#add8e6',
            info: '#ffffff',
            warn: '#ffa500',
            error: '#ff4500'
        };
        this.capturable = false;
        this.loggerName = loggerName;
        if (this.loggerName === undefined) {
            throw new Error("FATAL: Logger name can't be null.");
        }
        this.isVerbose = verbose;
        this.capturable = capturable;
        if (logFilePath != null) {
            this.logFilePath = logFilePath;
        }
        this.customColors = customColors;
        this.readConfig();
    }
    LightLogger.prototype.readConfig = function () {
        var configData;
        try {
            var content = fs_1.readFileSync(this.configFileName);
            configData = JSON.parse(content.toString());
        }
        catch (Error) {
            console.log("WARN:: " + this.configFileName + " not found!");
        }
        // load custom properties
        if (this.customColors) {
            this.setCustomColors(configData.colorCodes);
        }
        if (this.capturable) {
            this.setCaptureMessage(configData.captureKey);
        }
    };
    /*Setters*/
    LightLogger.prototype.setCustomColors = function (colorData) {
        this.messageColors.trace = colorData.trace;
        this.messageColors.warn = colorData.warn;
        this.messageColors.info = colorData.info;
        this.messageColors.error = colorData.error;
        this.messageColors.debug = colorData.debug;
    };
    LightLogger.prototype.setLogToFile = function (logToFile) {
        this.logToFile = logToFile;
    };
    LightLogger.prototype.setLogFilePath = function (logFilePath) {
        this.logFilePath = logFilePath;
    };
    LightLogger.prototype.setCapturable = function (capturable) {
        this.capturable = capturable;
    };
    LightLogger.prototype.setCaptureMessage = function (msg) {
        this.captureMessage = msg;
    };
    LightLogger.prototype.writeFileLog = function (message, level) {
        if (this.logToFile) {
            var entry = {
                date: new Date(),
                level: level,
                message: message
            };
            this.logObject.push(entry);
            fs_1.writeFile(this.logFilePath, JSON.stringify(this.logObject), function (err) {
                if (err) {
                    throw new Error(err.message);
                }
            });
        }
    };
    /*convenience*/
    LightLogger.prototype.silence = function (isSilent) {
        this.isSilent = isSilent;
    };
    LightLogger.prototype.verbose = function (isVerbose) {
        this.isVerbose = isVerbose;
    };
    LightLogger.prototype.getMessage = function (message, level) {
        var date = new Date();
        var logMessage;
        if (this.isVerbose) {
            if (this.captureMessage !== null) {
                logMessage = "[APIKEY:" + this.captureMessage + "] [" + this.loggerName + "] " + date + " : " + level + " :: " + message;
            }
            else {
                logMessage = "[" + this.loggerName + "] " + date + " : " + level + " :: " + message;
            }
        }
        else {
            logMessage = "[" + this.loggerName + "] " + level + " :: " + message;
        }
        return logMessage;
    };
    /* Logging methods */
    LightLogger.prototype.log = function (level, message) {
        level = level.toUpperCase().replace(/\s/g, "");
        if (level == "TRACE") {
            this.trace(message);
        }
        else if (level == "DEBUG") {
            this.debug(message);
        }
        else if (level == "INFO") {
            this.info(message);
        }
        else if (level == "WARN") {
            this.warn(message);
        }
        else if (level == "ERROR") {
            this.error(message);
        }
        else {
            throw new Error('Incorrect log level');
        }
    };
    LightLogger.prototype.trace = function (message) {
        var level = 'TRACE';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(logMessage, level);
        this.printMessage(this.messageColors.trace, logMessage);
    };
    LightLogger.prototype.debug = function (message) {
        var level = 'DEBUG';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.debug, logMessage);
    };
    LightLogger.prototype.info = function (message) {
        var level = 'INFO';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.info, logMessage);
    };
    LightLogger.prototype.warn = function (message) {
        var level = 'WARN';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.warn, logMessage);
    };
    LightLogger.prototype.error = function (message) {
        var level = 'ERROR';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.error, logMessage);
    };
    LightLogger.prototype.printMessage = function (color, message) {
        if (!this.isSilent) {
            console.log(chalk_1["default"].hex(color)(message));
        }
    };
    return LightLogger;
}());
module.exports = LightLogger;
