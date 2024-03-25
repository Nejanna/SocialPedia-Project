import requests

def test_login():
    url = 'http://your-backend-url/login'
    data = {'email': 'test@example.com', 'password': 'password'}  # Замініть на реальні дані
    response = requests.post(url, json=data)
    
    assert response.status_code == 200
    assert 'token' in response.json()
    assert 'user' in response.json()
