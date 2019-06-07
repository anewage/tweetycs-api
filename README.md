# TweetSense-API
A simple REST API for TweetSense Project

# Deploy
```bash
# Create config file
mv config/default.js config/local.js

# Edit config file
vim config/local.js
 
# Deploy the service
docker-compose up
```

# Config
Please refer to [this link](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

# Installing
Within the project directory (root folder) issue the following command:
```bash
npm install
```
 OR
```bash
yarn
``` 
# Testing
All the tests are located inside the `__tests__` directory. Tests are being done using [jest](https://jestjs.io/docs/en/getting-started). 
