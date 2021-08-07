module.exports = function (context, IoTHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array: ${IoTHubMessages}`);

    var battery = 0;
    var temperature = 0.0;
    var pressure = 0.0;
    var humidity = 0.0;
    var mac = "";
    var eventDate = new Date();

    IoTHubMessages.forEach(message => {
        context.log(`Processed message: ${message}`);
        battery = message.battery;
        temperature = message.temperature;
        pressure = message.pressure;
        humidity = message.humidity;
        mac = message.mac;
        eventdate = eventDate.toISOString();
    });

    var output = {
        "eventDate": eventdate,
        "mac": mac,
        "temperature": temperature,
        "humidity": humidity,
        "pressure": pressure,
        "battery": battery
    };

    context.log(`Output content: ${output}`);

    context.bindings.outputDocument = output;

    context.done();
};
