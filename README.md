1. Above code is code for the web application seperately ( node js server side )
2. The Python application ( dress recognition ) code can be found seperately at -- https://github.com/RohitPanyam/Search-Bar-CV
3. The code for the Online Virtual shop, and the ( node js app + python clothes detection app ), can be found all in one place at the Link : https://vitacin-my.sharepoint.com/:f:/g/personal/aniket_vishwakarma2019_vitstudent_ac_in/EgbQIZL-KZxKk0SWzUdrxWsBPOBW7qmU9ZBJYZrAhJLi8w?e=jM95zK
4. This link contains of the files which are correspond with the Game dev part and the website and dress recognition and recommendation part implemented together in their respective paths. ( Final folder contains the dress recognition, the MyntraFive - Copy folder contains C++ code and assets for the virtual shop )

# Login-Register-Nodejs
A simple Login/Register application developed in Nodejs using Express.

# Getting started

Unzip the downloaded file.

### Installing dependencies:
Enter this command it will install all the dependencies at once:

```
npm install
```
Or you can install them individually:

```
npm install express express-session mysql pug-cli bcrypt util.promisify
```

Sometimes you get errors and access denied add sudo to the command

```
sudo npm install express express-session mysql pug-cli bcrypt util.promisify
```

### Start the application

```
npm start
```
or
```
node app
```
### Database

For this application the database  name is 'www', it contains only one table 'users'

Go to core/pool.js enter your database username and password, you can use you own database name just make sure it's the same in the pool.js file so you can connect to database.

### Setting up the database

You can use PhpMyAdmin just import the database.sql file includes in the project directory

Use those queries:

```
CREATE DATABASE www;
```
```
USE www;
```
```
CREATE TABLE users (id int AUTO_INCREMENT, username varchar(20), fullname varchar(20), password varchar(128), PRIMARY KEY (id));
```

if you correcty setting up the database you shouldn't get any errors.
