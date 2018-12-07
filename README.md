# **webapp**

A repository for the clippy webapp.

## Installation
You should not need to install the clippy web application.  However, if 
you would like to run the webapp on a local server, the following steps
will correctly install the webapp.  Be aware that the web application 
depends on an external API.

To run the webapp, you will need NodeJS installed and npm to install the 
required dependencies.

Navigate to the location and clone the repo:
```
    git clone https://github.com/CopyPasteClipboard/webapp.git <desired folder name>
```

Navigate into the folder and install the required dependencies with npm:
```
    npm install
```

Run webpack to generate the SPA application
```
    npx webpack
```

Alternatively, if a production build make sure you have the NODE_ENV variable
set to production while running webpack.
```
    export NODE_ENV=production; npx webpack; unset NODE_ENV;
```

Finally, start the server
```
    npm start
```

Open your browser and navigate to http://localhost:8080 to see the webapp!