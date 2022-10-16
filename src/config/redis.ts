export default {
  db: parseInt(process.env.REDIS_DB),
  name: process.env.REDIS_NAME,
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
};
