import { login } from './controllers/auth.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

async function testLoginFunction() {
  try {
    const existingUser = {
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10)
    };

    jest.spyOn(User, 'findOne').mockResolvedValue(existingUser);

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      token: expect.any(String),
      user: expect.objectContaining({
        email: 'test@example.com'
      })
    }));
    
    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testLoginFunction();



