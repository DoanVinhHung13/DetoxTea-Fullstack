const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('../src/models');

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admins = await User.find({ role: 'admin' });
    console.log('Admins found:', admins.map(a => ({ id: a._id, username: a.username, email: a.email, role: a.role })));
    
    if (admins.length === 0) {
      console.log('No admins found in database!');
    }
    
  } catch (error) {
    console.error('Check script error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

check();
