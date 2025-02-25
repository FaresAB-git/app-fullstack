// src/services/authService.js

export const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }
  
    return data;
  };
  


export const registerUser = async (username, email, password) => {
  const response = await fetch('http://localhost:3000/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }

  return data;
};


export const getUser = async () => {
  
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/user/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }

  return data;
};



export const getUserById = async (userId) => {
  
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/user/' + userId, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }

  return data;
};

export const getAllUsers = async () => {
  
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/user/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }

  return data;
};
