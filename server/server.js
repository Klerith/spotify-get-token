/*
    Spotify API Token server
        Esta aplicación únicamente toma el CLIENTID y CLIENTSecret
        que brinda spotify, para obtener el token mediante una petición
        POST desde el front-end. 

*/

const express = require('express');
const request = require('request');
const path = require('path');

const app = express();


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/spotify/:client_id/:client_secret', (req, resp) => {

    let client_id = req.params.clientid;
    let client_secret = req.params.client_secret;
    let spotifyUrl = 'https://accounts.spotify.com/api/token';

    let data = {
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret
    };

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': `Basic ${client_id}:${client_secret}`
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'No se pudo obtener el token',
                err
            })
        }

        resp.json(httpResponse);
        // resp.json(body);

    })

});


app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});