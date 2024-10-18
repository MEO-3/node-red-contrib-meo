module.exports = function(RED) {
  const mqtt = require('mqtt');

  function meoIn(config) {
    RED.nodes.createNode(this, config);

    var defaultMQTTBrokerURL = 'mosquitto-mqtt:1883';

    this.deviceId = config.deviceId;
    this.sensorType = config.sensorType;
    this.url = config.url ? config.url : defaultMQTTBrokerURL;
    this.options = null;
    
    var node = this;

    var mqttBrokerURL = `mqtt://${node.url}`;
    var topic = `meo3/${node.deviceId}/${node.sensorType}`;

    node.status({fill: 'yellow', shape: 'ring', text: 'connecting'});
    node.client = mqtt.connect(mqttBrokerURL, node.options);

    node.client.on('connect', function() {
      node.status({fill: 'green', shape: 'ring', text: 'connected'});
      console.log('MQTT connected to:', mqttBrokerURL);
      node.client.subscribe(topic, {qos: 1}, function(err) {
        if (err) {
          node.status({fill: 'red', shape: 'dot', text: 'error'});
          console.log('MQTT subscribe error:', err);
        } else {
          node.status({fill: 'green', shape: 'dot', text: 'subscribed'});
          console.log('MQTT subscribed to:', topic);
        }
      });
    });

    node.client.on('message', function(topic, message) {
      console.log('Received message:', message.toString());
      node.send({
        topic: topic,
        payload: message.toString()});
    });

    node.client.on('error', function(error) {
      node.status({fill: 'red', shape: 'dot', text: 'error'});
      console.log('MQTT error:', error);
    });

    node.client.on('close', function() {
      node.status({fill: 'red', shape: 'ring', text: 'disconnected'});
      console.log('MQTT disconnected');
    });

  };

  RED.nodes.registerType("meo-in", meoIn);
}