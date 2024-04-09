const add = require('./controllers/math.js');

test('додавання 2 + 3 дорівнює 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('додавання -1 + 1 дорівнює 0', () => {
  expect(add(-1, 1)).toBe(0);
});