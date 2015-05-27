# currency-frontend

Contains both `PULL` and `PUSH` examples: 
- There is an usual implementation, where the data is requested on demand (PULL)
- There is also Socket.IO implementation, where data is PUSHed from the server to the frontend; there are 2 implementations in the GUI to visualize this: 

      - data is pushed and presented in a table
      
      - data is pushed and presented in a chart


## Prerequisites
- Install NodeJs 
- Install Grunt-cli: `npm install grunt-cli -g`
- Install Bower: `npm install bower –g`
- Install Compass
- In project root:
- - run `npm install`
- - run `bower install`

## Build for deployment

Run `grunt` for building and `grunt build war` to create a war file in dist/ which can be deployed to an application server.

URL: `http://localhost:8080/currency-frontend/#/trades`

## Build for development

Run `grunt serve:dev` for preview.

URL: `http://localhost:9000/#/trades`

## Testing

Running `grunt test` will run the unit tests with karma.

