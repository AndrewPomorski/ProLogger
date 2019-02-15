"use strict";
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var LightLogger = /** @class */ (function () {
    function LightLogger(loggerName, logToFile, logFilePath, verbose, customColors) {
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
        this.messageTemplates = {
            verbose: "",
            short: ""
        };
        this.loggerName = loggerName;
        this.logToFile = logToFile;
        this.isVerbose = verbose;
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
    };
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
            logMessage = "[" + this.loggerName + "] " + date + " : " + level + " :: " + message;
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
        if (!this.isSilent)
            console.log(chalk_1["default"].hex(this.messageColors.trace)(logMessage));
    };
    LightLogger.prototype.debug = function (message) {
        var level = 'DEBUG';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent)
            console.log(chalk_1["default"].hex(this.messageColors.debug)(logMessage));
    };
    LightLogger.prototype.info = function (message) {
        var level = 'INFO';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent)
            console.log(chalk_1["default"].hex(this.messageColors.info)(logMessage));
    };
    LightLogger.prototype.warn = function (message) {
        var level = 'WARN';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent)
            console.log(chalk_1["default"].hex(this.messageColors.warn)(logMessage));
    };
    LightLogger.prototype.error = function (message) {
        var level = 'ERROR';
        var logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent)
            console.log(chalk_1["default"].hex(this.messageColors.error)(logMessage));
    };
    return LightLogger;
}());
var log = new LightLogger('LightLogger', false, '', true, false);
log.info("info");
log.warn("warn");
log.error("error");
module.exports = LightLogger;