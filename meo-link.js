module.exports = function(RED) {
  const dgram = require('dgram');

  function meoLink(config) {
    RED.nodes.createNode(this, config);

    this.device_id = config.device_id;
    this.element_id = config.element_id;
    this.power_mode = config.power_mode;
    this.ip_address = config.ip_address;
    this.port = config.port;

    var node = this;
    node.udp = dgram.createSocket('udp4');

    node.on('input', function(msg) {
      var device_id = msg.device_id || node.device_id;
      var element_id = msg.element_id || node.element_id;
      var power_mode = msg.power_mode || node.power_mode;
      var ip_address = msg.ip_address || node.ip_address;
      var port = msg.port || node.port;

      node.udp.send(Buffer.from(`${device_id}:${element_id}:${power_mode}`), port, ip_address);
      console.log('Sending message:', `${device_id}:${element_id}:${power_mode}`);
    });

    node.on('close', function() {
      udp.close();
    });

    node.udp.on('error', function(error) {
      console.log('UDP error:', error);
    });
  };

  RED.nodes.registerType('meo-link', meoLink);
}