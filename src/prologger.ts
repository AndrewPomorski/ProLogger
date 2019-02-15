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
import chalk from 'chalk';
import { writeFile, readFileSync } from 'fs';

class LightLogger {
    private logToFile: boolean;
    private logFilePath = './log.json';
    private logObject = [];
    private errorLevels  = ["TRACE", "DEBUG", "INFO", "WARN",  "ERROR"];
    private isSilent = false;
    private isVerbose = false;
    private customColors = true;
    private loggerName: string;
    private configFileName = './.loggerconfig.json';
    private messageColors = {
        trace: '#1e90ff',
        debug: '#add8e6',
        info: '#ffffff',
        warn: '#ffa500',
        error: '#ff4500'
    };
    private capturable = false;
    private captureMessage: string;

    constructor(options?: any) {
        this.loggerName = options.loggerName;
        this.isVerbose = options.verbose;
        this.captureMessage = options.captureMessage;
        this.capturable = options.capturable;
        if (options.logFilePath != null) {
            this.logFilePath = options.logFilePath;
        }
        this.customColors = options.customColors;
        this.readConfig();
    }

    readConfig() {
        let configData: any;
        try {
            const content = readFileSync(this.configFileName);
            configData = JSON.parse(content.toString());
        } catch (Error) {
            console.log(`WARN:: ${this.configFileName} not found!`);
        }
        // load custom properties
        if (this.customColors) {
            this.setCustomColors(configData.colorCodes);
        }
    }

    /*Setters*/
    setCustomColors(colorData) {
        this.messageColors.trace = colorData.trace;
        this.messageColors.warn = colorData.warn;
        this.messageColors.info = colorData.info;
        this.messageColors.error = colorData.error;
        this.messageColors.debug = colorData.debug;
    }

    setLogToFile(logToFile: boolean) {
        this.logToFile = logToFile;
    }

    setLogFilePath(logFilePath: string){
        this.logFilePath = logFilePath;
    }

    setCapturable(capturable: boolean){ 
        this.capturable = capturable;
    }

    setCaptureMessage(msg: string) {
        this.captureMessage = msg;
    }

    writeFileLog(message: string, level: string) {
        if (this.logToFile) {
            
            let entry = {
                date: new Date(),
                level: level,
                message: message
            };

            this.logObject.push(entry);

            writeFile(this.logFilePath, JSON.stringify(this.logObject), (err) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
        }
    }

    /*convenience*/
    silence(isSilent: boolean) {
        this.isSilent = isSilent;
    }
    verbose(isVerbose: boolean) {
        this.isVerbose = isVerbose;
    }

    getMessage(message: string, level: string): string {
        const date = new Date();
        let logMessage: string;
        if (this.isVerbose) {
            if (this.captureMessage === null || this.captureMessage === undefined) this.captureMessage = "";
            logMessage = `${this.captureMessage} [${this.loggerName}] ${date} : ${level} :: ${message}`;
        } else {
            logMessage = `[${this.loggerName}] ${level} :: ${message}`;
        }
        return logMessage;
    }

    /* Logging methods */
    log(level: string, message: string){
        level = level.toUpperCase().replace(/\s/g, "");
        if (level == "TRACE") {
            this.trace(message);
        } else if (level == "DEBUG") {
            this.debug(message);
        } else if (level == "INFO") {
            this.info(message);
        } else if (level == "WARN") {
            this.warn(message);
        } else if (level == "ERROR") {
            this.error(message);
        } else {
            throw new Error('Incorrect log level');
        }
    }

    trace(message: string) {
        const level = 'TRACE';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(logMessage, level);
        this.printMessage(this.messageColors.trace, logMessage);
    }

    debug(message: string) {
        const level = 'DEBUG';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.debug, logMessage);
    }

    info(message: string) {
        const level = 'INFO';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.info, logMessage);
    }

    warn(message: string) {
        const level = 'WARN';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.warn, logMessage);
    }

    error(message: string){
        const level = 'ERROR';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        this.printMessage(this.messageColors.error, logMessage);
    }

    printMessage(color: string, message: string) {
        if (!this.isSilent) {
            console.log(chalk.hex(color)(message));
        }
    }
}
export = LightLogger;