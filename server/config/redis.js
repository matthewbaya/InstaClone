const Redis = require("ioredis");

const redis = new Redis({
  port: 19599,
  host: "redis-19599.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
  username: "default",
  password: "i5QNOXBeKt7othnRhZOYN6UKMLzTzLAe",
});
module.exports = redis;
