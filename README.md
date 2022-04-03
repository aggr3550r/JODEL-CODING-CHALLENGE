## Content
#### - Getting Started
#### - Setting Up The Environment
#### - Running The Application
#### - Running tests


### Getting Started 

    This app was built as part of the requirements of the software interview process at ***Jodel Venture GmbH***.
    It functions as a basic API that allows users to create a survey, take a survey and retrieve the results of a survey. It was built with a framework
    of NodeJS which is NestJS and the method of persistence used is a local MongoDB database.

    Following below are some instructions on how to set up the app so that you could run it locally on your machine.

### Setting Up The Environment

   - After you must have cloned this repo into your local machine, create a **.env** file and add an environment variable to it.
    The only variable you need to add in there to run the application as is is your **MONGO_URI**. An example of what the content of your .env file should look like
    is illustrated below:
     ```
     MONGO_URI='mongodb://localhost:27017/jodel-task'
     ```
   - Afterwards, navigate to the project's root path and run a simple **npm install** in your terminal to install all the packages and dependencies as curated in the **package.json** file 
##### Software requirements
    Things you should have installed on your computer for this program to run as expected:
    * Node.js >= V14.0.0
    * MongoDB >= V5.0


### Running the Application
   - Having done all the installation and setup above, it's time to run the application and start up the server
     To run the app, use the following command:

    ```
    npm run start:dev

    ```
   - The above command bootstaps the application into development mode. Now you can play around with the software
    
  - The above command bootstaps the application into development mode. Now you can play around with the software
    Within the project, I have integrated a REST Web API Client to make manual testing easier for everyone, you simply
    have to install the VSCode REST API Client Extension from the marketplace.

  - The endpoints that test the APIs endpoints are stored in files named _request.http_. These files are found within the folder 
    of the resources they are responsible for testing


    In the event that you are not familiar with this method of testing endpoints, I have also included a link below to the Postman docs where
    you will find a workspace with endpoints already setup and ready for testing 

    Link to Postman Workspace: [JODEL API](https://www.postman.com/kippa-api-doc/workspace/jodel)


### Running the tests

   - To run the test suite of tests I have written in the application, use the command below in the terminal while in the root of the application:

    ```
    jest
    ```
   - It's that simple. 
    **NOTE:** I have written just unit tests and also tested only for the features specified in the 
    coding challenge document. All other auxilliary features you may find in the application were written 
    to smoothen out my development process and as such do not require automated testing.




