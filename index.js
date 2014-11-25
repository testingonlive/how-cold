var express = require( 'express' ),
    app = express(),
    howCold = require( './howcold' );
    
app.get( '/', function( req, res ){

    res.sendFile( __dirname + '/index.html' );
});


app.get( '/tempEvent', function( req, res ){
    req.socket.setTimeout( Infinity );
    
    res.type( 'text/event-stream' );
    res.set( 'Cache-Control', 'no-cache' );
    res.set( 'Connection', 'keep-alive' );
    
    howCold.on( 'temp', function( temp ){
        res.write( 'id: temp\n' );
        res.write( 'data: ' + temp + '\n\n' );
    });
        
});


app.listen( 3000 );


