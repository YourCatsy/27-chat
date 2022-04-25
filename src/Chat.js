const CONNECTION_URL = 'wss://fep-app.herokuapp.com';

export default class Chat {
    constructor(config) {
        this.config = config;

        this.initConnection();
    }

    initConnection() {
        this.socket = new WebSocket(CONNECTION_URL);
        this.socket.onopen = this.onSocketOpen.bind(this);
        this.socket.onclose = this.onSocketClose.bind(this);
        this.socket.onmessage = this.onSocketMessage.bind(this);
    }

    onSocketOpen() {
        this.send({ username: 'System', message: 'New user connected.' });
    }
    onSocketClose() {
        console.warn('Disconnected');
        this.initConnection();
    }
    onSocketMessage(e) {
        this.config.onMessage && this.config.onMessage(JSON.parse(e.data));
    }

    send(message) {
        this.socket.send(JSON.stringify(message));
    }
}
