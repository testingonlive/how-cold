// create a readable stream of temperature data
var five = require( 'johnny-five' ),
    board = new five.Board(),
    events = require( 'events' ),
    emitter = new events.EventEmitter();

board.on( 'ready', function(){
     var sensor = new five.Sensor({
        pin: 'A0',
        freq: 1e3
    })
        

    sensor.on( 'data', function(){
        var voltage = this.value / 1024 * 5,        
            temperature = ( voltage - 0.5 ) * 100; 

        emitter.emit( 'temp', temperature );  
    });    

});



module.exports = emitter;
    

