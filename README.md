# Human vs. Zombies Frontend - Experis/Noroff 2022
This project is about the real life game "Humans vs Zombies" and the goal is to make the experience easier and more managable for both players and admins. 

This project is about building a software solution for players and administrators of the game Human vs. Zombies (HvZ). We have designed and implemened a software solution for managing the state and communication of one or more concurrent games of HvZ. The main components of the system are as follows:

- A static, single-page, front-end using react. 
- RESTful API service, through which the front end may interact with the database.
- PostGres database

The deployed front-end application can be found here: [Human vs. Zombies App](https://hvz-fe-noroff.herokuapp.com/) 

## Table of Contents

- [About](#about-and-application-content)
- [Installation](#installation)
- [Technologies](#technologies)
- [Contributors](#contributors)

## About and Application Content
With our application an administrator can create a game - area on the application map. Players can join the game, team up in squads, see missions and where other players are killed/turned into zombies. Players also gets a way to turn each other into zombies by using a "bitecode".

### Landing Page 
This page lists all the games and some information about them. Here you can also login or create a user to join games. 

### Game Page 
The game page consists of a map and is where the game is played. Users can see their location on a map, tombstones where other players died, missions and ping their location to squad members. If you are logged in with an admin user you can administrate the game and it's users. 

## Installation

### Link to Online application
https://hvz-fe-noroff.herokuapp.com/

### Local Setup and Installation 
- Download or clone the repository 
- Make sure you have Node.js installed 
- Open the terminal from the project folder
- Run the commands "npm install" -> "npm update" 
- Finally run "npm run dev" to run the application 
- View the application on http://localhost:3000

You can find the guide to set up the Back End of the project here: 
https://github.com/TrulsHafnor/HvZ-experis-be

## Technologies
- Javascript React
- CSS
- HTML
- Node.js 
- Bootstrap + Sass
- Auth0
- Sock JS
- Stomp JS
- Leaflet 

### Contributors
- [Lars-Inge Gammelsæter Jonsen](https://github.com/Kaladinge)
- [Sondre Mæhre](https://github.com/Sondrema)
- [Truls Ombye Hafnor](https://github.com/TrulsHafnor)
- [Jakob Slyngstadli](https://github.com/JakobDenGode)
- [Carl Markus Malde](https://github.com/CarlMarkus)

