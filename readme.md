# Welcome to AwayBnB, my project clone of AirBnB!
AwayBnB allows people to create homes to rent around the world.

## This project was developed utilizing:

* ####  Backend:
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)&nbsp;

* #### Frontend: 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp; 

* ####  Hosted on Heroku
[AwayBnB](https://airbnb-away.herokuapp.com/)

***

## Wiki Links:

* [Database Schema](https://github.com/EdgarMLee/AwayBnB/wiki/Database-Schema)
* [Features](https://github.com/EdgarMLee/AwayBnB/wiki/Features)
* [API Routes](https://github.com/EdgarMLee/AwayBnB/wiki/API-Routes)
* [Redux State Shape](https://github.com/EdgarMLee/AwayBnB/wiki/Redux-State-Shape)

***

## How to run AwayBnB Locally:
* Clone the repository in your terminal: ```git clone https://github.com/EdgarMLee/AwayBnB.git```
* Run ```npm install``` then open two terminal paths for both backend and frontend.
* Run ```npm start``` for backend first then frontend folder.
* Create a ```.env``` file under the root of the backend folder with the following contents:
```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=74yUZH5u7wkF0g==
JWT_EXPIRES_IN=604800
```
* In your terminal under the backend folder, migrate and seed the files as follows:
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
### Your local host should be running with full functionality now!

***

# Home Page:

![image](https://user-images.githubusercontent.com/101891232/187090540-f33c16ae-332f-470c-b346-28bd5e363cce.png)

# Find Spot:

![image](https://user-images.githubusercontent.com/101891232/187090561-3c024bc4-8a16-4c9a-8f7c-24929236e53f.png)

# View My Spots:

![image](https://user-images.githubusercontent.com/101891232/187090574-90471b48-a2fc-4255-ac1d-7d9c81dd92fa.png)

# Reviews:

![image](https://user-images.githubusercontent.com/101891232/187090598-d449fd98-08ea-4905-93a6-836a318bdffa.png)


# View My Reviews:

![image](https://user-images.githubusercontent.com/101891232/187090585-a48df491-b31d-49b4-bc2f-357f7f92abbc.png)

# Host Your Home:

![image](https://user-images.githubusercontent.com/101891232/187090612-30f841e8-9393-4cbf-8164-c56e2d7a105f.png)
