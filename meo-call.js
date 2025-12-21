module.exports = function(RED) {
    const mqtt = require('mqtt');

    function MeoCallNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        this.server = RED.nodes.getNode(config.server);
        
        if (this.server) {
            var brokerUrl = `mqtt://${this.server.broker}:${this.server.port}`;
            var deviceId = config.device_id;
            var featureName = config.feature_name;

            var client = mqtt.connect(brokerUrl);

            client.on('connect', function() {
                node.status({fill: "green", shape: "dot", text: "connected"});
            });

            client.on('error', function(err) {
                node.status({fill: "red", shape: "dot", text: "error"});
                node.error(err);
            });

            node.on('input', function(msg) {
                if (!deviceId || !featureName) {
                    node.warn("Device ID or Feature Name missing");
                    return;
                }

                // Topic: meo/{device_id}/feature/{feature_name}/invoke
                var topic = `meo/${deviceId}/feature/${featureName}/invoke`;
                
                // Payload should be a JSON object of parameters
                var payload = msg.payload;
                if (typeof payload !== 'string') {
                    payload = JSON.stringify(payload);
                }

                client.publish(topic, payload, {qos: 1});
                node.status({fill: "blue", shape: "dot", text: "sent: " + featureName});
            });

            node.on('close', function() {
                if (client) client.end();
            });
        }
    }
    RED.nodes.registerType("meo-call", MeoCallNode);
}