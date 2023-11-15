# Weather App

## Introduction
> This is a Mini Weather App implemented using MERN stack.
Author: @ChathuraMathula

## Installation steps (for development)
1. Download and extract the source code.

1. Install and run docker engine on your PC.

> [!IMPORTANT] 
> If the docker version you have installed runs on WSL backend, you will have to store project files inside WSL file system instead of Windows file system. (Otherwise the changes made to the files throughout the development will not be reflected properly)

1. Create a directory called `database` inside the project root directory.

1. Create a directory called `data` inside the `database` directory which was created above.

> [!WARNING]
> If you did not create a `database` directory and `data` sub directory, docker image will not run properly.

1. Make sure your host computer does not connected the other running programmes to these ports `3000, 3001, 27017`

1. Run `docker-compose up --build` command in the project root directory (where docker-compose.yaml file is located) to build the docker image using docker-compose.yaml file. Then, the multi container app will be built and run automatically by docker. 

1. After successfully created the image, docker will automatically start the containers.

>[!NOTE]
>When the back-end node.js server is running for the first time, it will call for data populating scripts in order to start the application. Please wait untill all the data inside the city.list.json and cities.json files get populated to the MonogoDB database. 

1. Finally, When the back-end node.js server is listening on port 3001, you can visit http://localhost:3000/ to use the application.