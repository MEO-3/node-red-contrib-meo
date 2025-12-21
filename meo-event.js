module.exports = function(RED) {
    const mqtt = require('mqtt');

    function MeoEventNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);
        
        if (this.server) {
            var brokerUrl = `mqtt://${this.server.broker}:${this.server.port}`;
            var targetDevice = config.device_id || "+";
            var targetEvent = config.event_name;

            // Connect to MQTT
            node.status({fill: "yellow", shape: "ring", text: "connecting"});
            var client = mqtt.connect(brokerUrl);

            client.on('connect', function() {
                node.status({fill: "green", shape: "dot", text: "connected"});
                // Subscribe to all device events to ensure we catch everything, then filter
                client.subscribe('meo/+/event', function(err) {
                    if (err) node.error("Subscription error: " + err);
                });
            });

            client.on('message', function(topic, message) {
                // Topic format: meo/{device_id}/event
                var parts = topic.split('/');
                var deviceId = parts[1];
                
                // Filter by Device ID (if specific device selected)
                if (targetDevice !== "+" && targetDevice !== deviceId) {
                    return;
                }

                try {
                    var payload = JSON.parse(message.toString());
                    
                    // Filter by Event Name (if specific event entered)
                    if (targetEvent && payload.event_name !== targetEvent) {
                        return;
                    }
                    
                    // Enrich message
                    var msg = { 
                        payload: payload, 
                        topic: topic,
                        device_id: deviceId,
                        event: payload.event_name || "unknown"
                    };
                    
                    node.send(msg);
                } catch (e) {
                    node.warn("Failed to parse JSON from device " + deviceId);
                }
            });

            client.on('error', function(err) {
                node.status({fill: "red", shape: "dot", text: "error"});
                node.error(err);
            });

            node.on('close', function() {
                if (client) client.end();
            });
        } else {
            node.status({fill: "red", shape: "dot", text: "no config"});
        }
    }
    RED.nodes.registerType("meo-event", MeoEventNode);
}