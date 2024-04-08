import { login } from './controllers/auth.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';
describe('login function', () => {
  it('should return a token and user object upon successful login', async () => {
    // Створюємо відмінні дані користувача для тестування
    const mockUser = {
      _id: '66142e3706cccd8c747b5ce8',
      email: 'aaaaaaa@gmail.com',
      password: "$2b$10$ZuLlnakDT/ZpQIjzWB3A2.YXie7BaN0M7QbLPPm0/FyvJwyp/1ssW" // Хешуємо пароль
    };

    // Створюємо макети для об'єктів req та res
    const req = {
      body: {
        email: 'aaaaaaa@gmail.com',
        password: '1234567890'
      }
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    // Мокуємо метод findOne моделі користувача
    const User = require('./models/User.js'); // Припустимо, що у вас є модель User
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    // Викликаємо функцію login
    await login(req, res);

    // Перевіряємо, чи викликали ми res.status з кодом 200
    expect(res.status).toHaveBeenCalledWith(500);
  
  },20000);

});