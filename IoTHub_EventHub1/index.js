module.exports = function (context, IoTHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array: ${JSON.stringify(IoTHubMessages)}`);

    var battery = 0;
    var temperature = 0.0;
    var pressure = 0.0;
    var humidity = 0.0;
    var mac = "";
    var eventDate = new Date();
    var location = "missing";
    
    const ruuviLocationTable = {
        "f39a99eac7c2": "terassi",
        "c383afc5299b": "olohuone",
        "d17ce99cd44e": "makuuhuone",
        "cdf431cfc39d": "kellari",
        "e2511609b6ec": "autotalli",
        "cc92886665d4": "kylpyhuone"
    };
    
    const ruuviLocation = (mac) => ruuviLocationTable[mac] || "missing";

    IoTHubMessages.forEach(message => {
        context.log(`Processed message: ${JSON.stringify(message)}`);
        battery = message.battery;
        temperature = message.temperature;
        pressure = message.pressure;
        humidity = message.humidity;
        mac = message.mac;
        location = ruuviLocation(message.mac);
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
