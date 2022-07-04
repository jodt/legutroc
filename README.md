# Portfolio project - Legu'troc

## Description

Legu'troc is our portfolio project concluding our formation at Holberton School. It's a vegetable sharing full-stack app.\
We were free to choose the project of our choice and also the technologies.

The goal of the project was to create an app which would allow to :

- Fight against vegetable waste
- Win / Win for the 2 traders
- Create social connection

Otherwise our project will not solve:

- food self-sufficiency, users will still need to obtain supplies from shops, in particular for varieties of fruits and vegetables not cultivated in our climates.

Our project can help every type of user who have an excess of culture and who wants to get something else in return.\
The most targeted users will be individuals.

### Team members

[Joël Dumortier](https://github.com/jodt/) (Front-end)\
[Philippe Willot](https://github.com/phwillot/) (Back-end)

We decided these roles because they correspond to what we want to specialize.

## Table of Contents

- [Technologies](#technologies)
- [Functionalities](#functionalities)
- [Architecture](#archictecture)
- [Installation](#installation)
- [Front-end](#front-end)
- [Back-end](#back-end)
  - [Database](#Database)
  - [API](#API)
- [Credits](#credits)
- [License](#license)

## Technologies

Front-end : HTML, CSS, JavaScript (React)\
Back-end : Node.js (Express), Sequelize with MySQL

We used React for the dynamic aspect of the page, and Express to stay in the JavaScript environment and in the MERN stack.

## Functionalities

List of functionnalities we have built... ** TO DO **

## Archictecture

![Architecture of project](https://i.imgur.com/V8QcUxm.png)

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

## Front-end

The dashboard allows you to see your products and the exchange proposals received. You can use the buttons to add products or offer exchanges in turn
![Dashboard page](https://zupimages.net/up/22/26/omr2.png)

The "Ajouter un produit" page allows you to add a product from your harvest with a description if necessary
![Addproduct page](https://zupimages.net/up/22/26/kfsl.png)

The "Proposer un échange" page allows you to search, by city, by product name, for both or all of the available products, the products that interest you and to offer an exchange for a product from your harvest.
![Trade page](https://zupimages.net/up/22/26/trp1.png)

## Back-end

### Database

![Database schema](https://i.imgur.com/8Qg3edS.png)

### API

Base URL of the API: localhost:4000

#### **Users routes**

- **GET** - /api/users - Return all the users
- **GET** - /api/users/:userId - Return info about an user based on userId param
- **POST** - /api/users - Creates an user based on the body
  - Before creating, check if the email already exists in the database
- **PUT** - /api/users/:userId/password - Change the password of an user
- **PUT** - /api/users/:userId/city - Change the city of an user
- **DELETE** - /api/users/:userId - Deletes an user

#### **Vegetables routes**

- **GET** - /api/vegetables - Return all the vegetables
- **GET** - /api/vegetables/:vegetableId - Return info about a vegetables based on vegetableId param
- **POST** - /api/vegetables - Creates a vegetable
- **DELETE** - /api/vegetables/:vegetableId - Deletes a vegetable

#### **userProduction routes**

- **GET** - /api/userProduction/search - Return all the production filtered based on the query params (if no params return all the production)

  - Params: city and vegetable

- **GET** - /api/userProduction/:userId - Return all the production based on the userId param

- **GET** - /api/userProduction/:userId/accepted - Return all the production with the status accepted based on the userId param

- **POST** - /api/userProduction/:userId - Add a production to an user

- **DELETE** - /api/userProduction/:userId/:productionId - Deletes a production to an user

- **PUT** - /api/userProduction/:productionId/status - Changes the status of a production to accepted

#### **Trades routes**

- **GET** - /api/trades - Return all the trades for every user

- **GET** - /api/trades/:userProductionId - Return all the trades associated to the userProduction id param

- **POST** - /api/trades - Creates a trade between 2 productions

- **PUT** - /api/trades/:tradeId/status - Changes the status of a trade to accepted

- **DELETE** - /api/trades/:tradeId/delete - Deletes a trade

- **POST** - /api/trades/exist - Check if there is already an existing trade between 2 productions

## Credits

List any third party librairies used here.

## License

Not defined yet.
