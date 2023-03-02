MERN FullStack Application

1.) Create Cluster and then Database and then collection.
    -navigate to MongoDBAtlas
        -create Cluster 
        -create Database    
        -create collection 

2.) Create folder stucture for application:
    - Client Folder (frontend of stack)
    -Server Folder (Backend of stack)


    *initialize repository









Backend Configuration:

3.) Create JSON for application: 
JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects 
consisting of attribute–value pairs and arrays. It is a common data format with diverse uses in electronic data interchange, including 
that of web applications with servers.

npm = npm is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager
 for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and
 paid-for private packages, called the npm registry

-Open terminal window and use the following command to create JSON FILE:

    -CD server
    - npm init -y


4.) install Backend dependencies:

command in terminal window: npm install cors mongoose express nodemon


5.) Amend package.json to assign nodemon to server file:

*amended package.json content: 

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js" <<<<----------- modify to this value
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^6.7.4",
    "nodemon": "^2.0.20"
  }
}