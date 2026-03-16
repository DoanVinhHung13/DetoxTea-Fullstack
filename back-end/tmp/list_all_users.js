const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('../src/models');

dotenv.config();

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).lean();
    console.log(`TOTAL_USERS:${users.length}`);
    users.forEach(u => {
      console.log(`USER_ID:${u._id.toString()}|ROLE:${u.role}|EMAIL:${u.email}`);
    });
  } catch (error) {
    console.error('List users script error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

listUsers();
