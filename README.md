# Weather App

## Introduction
This is a Mini Weather App implemented using MERN stack.
Author: @ChathuraMathula

## Installation steps (for development)
1. Download and extract the source code.

1. Install and run Docker Desktop on your PC.

1. Open a terminal and navigate to the project root directory. (Directory where docker-compose.yaml file is located)

1. To build the image and start running the containers from that image please execute the command `docker-compose up`.

1. After successfully starting the containers, you will have to wait untill the message `Server is listening on port 3001` is displayed on the console.

1. Finally, visit http://localhost:3000/ from your Chrome/Edge/Firefox web browser.

> [!NOTE] 
> This application uses host computers' ports `3000, 3001` and `27017`.
> To stop the running containers, use `docker-compose stop` command.