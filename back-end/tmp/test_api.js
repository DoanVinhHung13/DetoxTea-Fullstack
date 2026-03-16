const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { getAllOrdersAdmin } = require('../src/controllers/adminController');
const { Order, User, Address, OrderItem, Product, ShippingInfo } = require('../src/models');

dotenv.config();

const test = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    const req = {
      query: { page: 1, limit: 10 }
    };

    const res = {
      status: (code) => {
        console.log('Status Code:', code);
        return res;
      },
      json: (data) => {
        console.log('Response JSON:', JSON.stringify(data, null, 2));
      }
    };

    console.log('Calling getAllOrdersAdmin...');
    await getAllOrdersAdmin(req, res);
    console.log('Done.');

  } catch (error) {
    console.error('Test script error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

test();
