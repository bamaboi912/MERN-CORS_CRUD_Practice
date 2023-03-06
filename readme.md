MD extension = markdown documentation.

highlight critical building stages of the application and purpose for the application as well as details


The purpose of this application is to create and store patient information pertaining to their name, date of birth, insurance provider, patient identification number and if they have been discharged. This will be useful in terms of holding details for patients. The information for every patient can be updated and deleted for modification purposes. The information will be displayed on a card component, having a home webpage, a webpage to create a patient, & a webpage page to display the patient information. Updating of patient information or deleting of a patient will done on the card component. 

Backend Configuration:

nodemon = Nodemon is a popular tool that is used for the development of applications based on node. js. It simply restarts the node application whenever it observes the changes in the file present in the working directory of your project

mongoose = Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment

express = Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. I

cors = Cross-origin resource sharing is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.

command: npm install mongoose cors express nodemon


*insert screenshot of dependencies in JSON

![Alt text](MD%20images/backend%20dependencies.png)


CRUD OPERATIONS FOR BACKEND:


1. Create Post Request to populate DB
![Alt text](MD%20images/Post%20request.png)
*insert screen shot of using post request url to send information to DB

2. Create Get request to get all information from DB.
 ![Alt text](MD%20images/get%20request.png)
*insert screenshot of using get requet to fetch values from collection from DB


3. Create get request to fetch individual value from Db
![Alt text](MD%20images/get%20request%20individual.png)
*screen shot of using request to fetch individual value from DB

4. Create update request to update information for values in collection. 
![Alt text](MD%20images/update%20request.png)
*insert screenshot of using update request to update information


5. Create delete request to delete a value from collection.
![Alt text](MD%20images/delete%20request.png)



npx - NPX stands for Node Package eXecute. It is simply an NPM package runner. It allows developers to execute any Javascript Package available 
on the NPM registry without even installing it. NPX is installed automatically with NPM version 5.2.

Create Client Folder. command to install REACT: npx create-react-app .

install react router for URLS and CRUD ops: 
command: npm install react-router-dom@6

install MaterialUI Library to render images
command: npm install @mui/material @emotion/react @emotion/styled

then search for icons after download in search bar on smae page:
icons command: 
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

or npm install @mui/icons material


then npm start:


1. Create screen shot for home page.
![Home page](MD%20images/Home%20page.png)

2. Create screen shot for Add patient
![Add Patient](MD%20images/add%20patient.png)

3. Create screen shot for Patient information.
![Patient Information](MD%20images/patient%20information%20page.png)

4. Create screen shot for About page.
![About page](MD%20images/about%20page.png)

5. Create screen shot for patient update.
![Alt text](MD%20images/patient%20update.png)