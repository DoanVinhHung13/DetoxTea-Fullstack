const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const debug = async () => {
  try {
    console.log('Connecting to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    console.log('Databases:', dbs.databases.map(db => db.name));
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in current DB:', collections.map(c => c.name));
    
    if (collections.find(c => c.name === 'users')) {
      const users = await mongoose.connection.db.collection('users').find({}).toArray();
      console.log('Found', users.length, 'users');
      users.forEach(u => {
        console.log(`ID_MATCH_CHECK: ${u._id.toString()} | Role: ${u.role} | Email: ${u.email}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

debug();
