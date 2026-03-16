const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('../src/models');

dotenv.config();

const findUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).lean();
    console.log('--- USER LIST ---');
    users.forEach(u => {
      console.log(`ID: ${u._id.toString()} | Role: ${u.role} | Email: ${u.email}`);
    });
    console.log('--- END ---');
    
    const prefixMatch = users.find(u => u._id.toString().startsWith('66e3'));
    if (prefixMatch) {
      console.log('FOUND MATCH FOR 66e3:');
      console.log(JSON.stringify(prefixMatch, null, 2));
    } else {
      console.log('NO MATCH FOUND FOR 66e3');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

findUser();
