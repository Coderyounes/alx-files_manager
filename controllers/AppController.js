// eslint-disable-next-line import/no-named-as-default
import redisClient from '../utils/redis';
import DBClient from '../utils/db';

const getStatus = async (req, res) => {
  const redisStatus = await redisClient.isAlive();
  const dbStatus = await DBClient.isAlive();
  res.status(200).json({ redis: redisStatus, db: dbStatus });
};

const getStats = async (req, res) => {
  const usersCount = await DBClient.nbUsers();
  const filesCount = await DBClient.nbFiles();
  res.status(200).json({ users: usersCount, files: filesCount });
};

module.exports = { getStatus, getStats };
