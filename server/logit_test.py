import requests
import unittest

class TestLogin(unittest.TestCase):
    def test_successful_login(self):
        url = 'http://localhost:3000/' 
        data = {'email': 'tryryryrt@gmail.com', 'password': '9078'} 
        response = requests.post(url, json=data)

        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.json())
        self.assertIn('user', response.json())

if __name__ == '__main__':
    unittest.main()

