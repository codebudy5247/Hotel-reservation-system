import { createClient } from 'redis';

// const redisUrl = `redis://localhost:6379`;
const redisUrl = process.env.REDIS_URL || "redis://default:5698d6027eb44f6e98b86259b06e29d3@apn1-useful-katydid-33905.upstash.io:33905"
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected...');
  } catch (err: any) {
    console.log("Redis error",err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;
