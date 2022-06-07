module.exports = function (context, IoTHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array: ${JSON.stringify(IoTHubMessages)}`);

    var battery = 0;
    var temperature = 0.0;
    var pressure = 0.0;
    var humidity = 0.0;
    var mac = "";
    var eventDate = new Date();
    var location = "";
    
    const locationTable = {
        "f39a99eac7c2": "olohuone",
        "c383afc5299b": "terassi",
        "d50a0961daa6": "makuuhuone",
        "cdf431cfc39d": "kellari"
    };

    IoTHubMessages.forEach(message => {
        context.log(`Processed message: ${JSON.stringify(message)}`);
        battery = message.battery;
        temperature = message.temperature;
        pressure = message.pressure;
        humidity = message.humidity;
        mac = message.mac;
        location = (mac) => locationTable[mac.toString()];
        context.log(`location lookup: ${JSON.stringify(location)}`);
        eventdate = eventDate.toISOString();
    });

    var output = {
        "eventDate": eventdate,
        "mac": mac,
        "location": location,
        "temperature": temperature,
        "humidity": humidity,
        "pressure": pressure,
        "battery": battery
    };

    context.log(`Output content: ${JSON.stringify(output)}`);

    context.bindings.outputDocument = output;

    context.done();
};
