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
    private messageTemplates = {
        verbose: ``,
        short: ``
    }
    

    constructor(loggerName: string, logToFile?: boolean, logFilePath?: string, verbose?: boolean, customColors?: boolean) {
        this.loggerName = loggerName;
        this.logToFile = logToFile;
        this.isVerbose = verbose;
        if (logFilePath != null) {
            this.logFilePath = logFilePath;
        }
        this.customColors = customColors;
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
            logMessage = `[${this.loggerName}] ${date} : ${level} :: ${message}`;
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
        if (!this.isSilent) console.log(chalk.hex(this.messageColors.trace)(logMessage));
    }

    debug(message: string) {
        const level = 'DEBUG';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent) console.log(chalk.hex(this.messageColors.debug)(logMessage));
    }

    info(message: string) {
        const level = 'INFO';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent) console.log(chalk.hex(this.messageColors.info)(logMessage));
    }

    warn(message: string) {
        const level = 'WARN';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent) console.log(chalk.hex(this.messageColors.warn)(logMessage));
    }

    error(message: string){
        const level = 'ERROR';
        const logMessage = this.getMessage(message, level);
        this.writeFileLog(message, level);
        if (!this.isSilent) console.log(chalk.hex(this.messageColors.error)(logMessage));
    }
}
let log = new LightLogger('LightLogger', false, '', true, false);
log.info("info");
log.warn("warn");
log.error("error");
export = LightLogger;