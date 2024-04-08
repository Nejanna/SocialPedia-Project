import { login } from './controllers/auth.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

describe('Test login function', () => {
  let existingUser;

  beforeEach(() => {
    // Створення існуючого користувача для тестування
    existingUser = {
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10) // Пароль буде хешований для порівняння
    };
    jest.spyOn(User, 'findOne').mockResolvedValue(existingUser);
  });

  // Тестування успішного входу
  it('should return a token and user object for valid credentials', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password' // Пароль відповідає хешуванному паролю користувача
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await login(req, res);

    // Очікується, що функція відповість з токеном та об'єктом користувача
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      token: expect.any(String),
      user: expect.objectContaining({
        email: 'test@example.com'
      })
    }));
  });
});
