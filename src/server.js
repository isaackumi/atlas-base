import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

// Application Level Middleware
app.use(cors())
app.use( bodyParser.json( { limit: '50mb' } ) );
app.use( bodyParser.urlencoded( { limit: '50mb', extended: true } ) );

app.use( '*', (req, res, next) => {
    res.sendStatus( '404' );
});

const server = http.createServer(app);

server.listen( process.env.PORT || 3000, () => {
  console.info( `waymo-api on port ${server.address().port} is online.` );
} );