//à faire
export const getTask = async (projectId) => {

  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3000/api/tasks/project/' + projectId, {
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



export const createTask = async (title, description, project) => {

const token = localStorage.getItem('token');
const userId =  localStorage.getItem('userId');
console.log(userId);
console.log(title);

const response = await fetch('http://localhost:3000/api/tasks/', {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      "title": title,
      "description": description,
      "author": userId,
      "project": project
  }
  )

});

const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || 'Erreur de connexion');
}

return data;
};


export const updateStatusTask = async (status, taskId) => {

  const token = localStorage.getItem('token');
  const userId =  localStorage.getItem('userId');
  console.log(userId);
  console.log(status);
  console.log(taskId);
 
  
  const response = await fetch('http://localhost:3000/api/tasks/' + taskId, {
      method: 'PUT',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "status": status,
        "editer": userId,
    }
    )
  
  });
  
  const data = await response.json();
  
  if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
  }
  
  return data;
  };

  export const updateTask = async (title, description, taskId) => {

    const token = localStorage.getItem('token');
    const userId =  localStorage.getItem('userId');
    console.log(userId);
    console.log(taskId);
   
    
    const response = await fetch('http://localhost:3000/api/tasks/' + taskId, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          "editer": userId,
          "title": title,
          "description": description,
      }
      )
    
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
    }
    
    return data;
    };