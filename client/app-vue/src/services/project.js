export const getProjectByUser = async () => {
  
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const response = await fetch('http://localhost:3000/api/project/user/' + userId, {
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

//marche pas encore
export const createProject = async (title, description) => {
  
  const token = localStorage.getItem('token');
  const userId =  localStorage.getItem('userId');
  console.log(userId);
  console.log(title);

  const response = await fetch('http://localhost:3000/api/project', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      'title': title,
      'description': description,
      'owner': userId
    })

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
  }

  return data;
};