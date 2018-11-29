/**
 * Subscriber
 */
import Singleton from 'react-singleton';

class Subscriber {
  socket = null;
  clients = {};

  init(socket) {
    if (this.socket) {
      return null;
    }

    this.socket = socket;
  }

  attach({ id, event }, cb = () => {}) {
    this.socket.removeAllListeners(this.clients[id]);

    /* Add new event to passed client with provided id */
    this.clients[id] = event;

    this.socket.on(event, data => {
      cb(data);
    });
  }
}

const subscriber = new Subscriber();
export default subscriber;
