# Portfolio project - Legu'troc

## Description

Legu'troc is our portfolio project concluding our formation at Holberton School. It's a vegetable sharing full-stack app.

We were free to choose the project of our choice and also the technologies.

...

Please before using our application, read carefully the installation menu.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Functionalities](#functionalities)
- [Front-end](#front-end)
- [Back-end](#back-end)
  - [Database](#Database)
  - [API](#API)
- [Credits](#credits)
- [Authors](#Authors)
- [License](#license)

## Technologies

## Installation

We made this project on **Ubuntu 20.04 LTS.**

1. In order to run our app, please clone the repo and run these commands on your terminal.

```
cd legutroc/
npm install
```

2. Please install mysql-server on your machine if it's not already the case

```
sudo apt-get install mysql-server
```

Then create a empty database called legutroc and change the root password to an empty string.

```
($) mysql
mysql> CREATE DATABASE IF NOT EXISTS legutroc;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
```

3. (Optional) Run the setup file in order to fill the database with fake data by running :

```
node server/mysql/setup.js
```

4. Finally, in order to start the application, you have to open 2 terminals.

On each terminal run:

Terminal #1 (This terminal starts the React application listening on port 3000)

```
npm start
```

Terminal #2 (This terminal starts the Express server (API) on port 4000)

```
npm run server
```

You should now have the app running on your brower on [localhost](http://localhost:3000).

If you have skipped step #3, there'll be no users set.
You'll have to create an user first before starting using the app.

Otherwise, we already provided 2 accounts in the setup file.

**Account 1** :\
email : test@test.com\
password : test

**Account 2** :\
email : test2@test.com\
password : test2

You can now use the app !

## Functionalities

List of functionnalities we have built...

## Front-end

More details on the front-end part of the app...

## Back-end

### Database

More details on MySQL and Sequelize.

### API

Description: ...

#### Routes

Details of all routes coming here...

## Credits

List any third party librairies used here.

## Authors

Made by :

[Joël Dumortier](https://github.com/jodt/) (Front-end)

[Philippe Willot](https://github.com/phwillot/) (Back-end)

## License

Not defined yet.
