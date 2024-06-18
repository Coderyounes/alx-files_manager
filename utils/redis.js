import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isConnect = null;
    this.client.on('error', (err) => {
      console.log(err);
      this.isConnect = false;
    });

    this.client.on('connect', () => { this.isConnect = true; });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async set(key, value, duration) {
    return promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
