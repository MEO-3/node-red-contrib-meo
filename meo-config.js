module.exports = function(RED) {
    function MeoConfigNode(n) {
        RED.nodes.createNode(this, n);
        this.broker = n.broker;
        this.port = n.port;
        this.api_url = n.api_url;
    }
    RED.nodes.registerType("meo-config", MeoConfigNode);
}