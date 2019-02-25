# TweetSense-API
A simple REST API for TweetSense Project

# Config
Please refer to [this link](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

# Installing the dependencies
Within the project directory (root folder) issue the following command:
```bash
npm install
```
 OR
```bash
yarn
``` 

# Deploying
First Configure the environment variables inside `config` directory:
```bash
mv config/default.js local.js # Create the config file for your local deployment
vim config/local.js # Edit the config file as you wish
```
Now you can deploy the API:
```bash
yarn dev # For development

yarn start # For production
```
