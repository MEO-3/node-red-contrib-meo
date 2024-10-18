module.exports = function(RED) {
  const mqtt = require('mqtt');

  function meoOut(config) {
    RED.nodes.createNode(this, config);

    var defaultMQTTBrokerURL = 'mosquitto-mqtt:1883';

    this.topic = config.topic;
    this.url = config.url || defaultMQTTBrokerURL;
    this.options = null;

    var node = this;

    var mqttBrokerURL = `mqtt://${node.url}`;
    var topic = node.topic;

    node.status({fill: 'yellow', shape: 'ring', text: 'connecting'});
    node.client = mqtt.connect(mqttBrokerURL, node.options);

    node.client.on('connect', function() {
      node.status({fill: 'green', shape: 'ring', text: 'connected'});
      console.log('MQTT connected to:', mqttBrokerURL);
    });

    node.on('input', function(msg) {
      node.status({fill: 'yellow', shape: 'dot', text: 'publishing'});
      var payload = msg.payload;
      console.log('Sending message:', payload);
      node.client.publish(topic, payload, {qos: 1}, function(err) {
        if (err) {
          node.status({fill: 'red', shape: 'dot', text: 'error'});
          console.log('MQTT publish error:', err);
        } else {
          node.status({fill: 'green', shape: 'dot', text: 'published'});
          console.log('MQTT published to:', topic);
        }
      });
    });

    node.client.on('error', function(error) {
      node.status({fill: 'red', shape: 'dot', text: 'error'});
      console.log('MQTT error:', error);
    });

    node.on('close', function() {
      node.client.end();
      node.status({fill: 'red', shape: 'ring', text: 'disconnected'});
      console.log('MQTT disconnected');
    });

  };

  RED.nodes.registerType('meo-out', meoOut);
}