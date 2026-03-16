const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('../src/models');

dotenv.config();

const find = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Find users whose ID starts with '66e3'
    // Since it's a hex ID, we can search by regex on stringified ID if possible, 
    // but better just find all and filter in JS if not many
    const users = await User.find({}).lean();
    const matches = users.filter(u => u._id.toString().startsWith('6' + '6' + 'e' + '3'));
    console.log('Matches found:', matches.map(u => ({ id: u._id, username: u.username, email: u.email, role: u.role })));
    
  } catch (error) {
    console.error('Find script error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

find();
