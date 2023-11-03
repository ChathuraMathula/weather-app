# Weather App

## Installation steps
01. Download and extract the source code.
02. Change the API key in .env file of the project root folder to your key taken from https://openweathermap.org/
03. Install and run docker engine on your PC.
04. Run `docker build -t my-weather-app:latest .` 
command in the project root directory to build the docker image using docker file.
05. Run `docker run -d -p 3000:8080 my-weather-app:latest` 
command to start the container from the created image in detached mode. change port number 3000 (host port number) to your preferred port.
06. Finally, visit http://localhost:3000/ to start the application.