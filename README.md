# Pro Logger

ProLogger is an attempt to create a more robust, hackable logging solution for Javascript.

So far it features:

 - Configurable color schemes
 - 5 levels of logs (TRACE, DEBUG, INFO, WARN, ERROR)
 - Writing to log files
 - Inserting custom elements to message template (for example API keys for easier logs parsing)
 - Silencing
 - Verbose mode
 
Some features I have in mind:
 
 - Editing message template
 - Logstash support
 - Silencing on a per-level basis
 - TypeScript support
 - Optimizing file size
 - Removing unnecessary dependancies


The idea is to making as fully-featured as possible without adding too much overhead to something as basic as logging. 
The minified file is only 3.8K small, however the goal is to go under 2KB and dependancy-free.
