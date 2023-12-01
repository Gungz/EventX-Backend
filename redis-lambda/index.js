const Redis = require('ioredis');

exports.handler = async (event) => {
  const client = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  });

  try {
    //console.log(event);
    const { ids, loginId, userId, eventId } = JSON.parse(event.body);
    if(ids) {
      console.log(ids);
      const data = await client.mget(ids);
      let events;
      if (loginId) {
        events = await client.smembers(loginId);
      }
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify({ data, events }),
      };
    } else {
      await client.sadd(userId, eventId);
      await client.incr(eventId);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),
      };
    }
  } catch (error) {
    console.error('Error retrieving data from Redis:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  } finally {
    client.quit();
  }
};