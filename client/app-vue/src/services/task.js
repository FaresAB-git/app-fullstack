require('dotenv').config();

//à faire
export const getTask = async (projectId) => {

  const token = localStorage.getItem('token');

  const response = await fetch(process.env.API_URI+'/api/tasks/project/' + projectId, {
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



export const createTask = async (title, description, responsable, project) => {

const token = localStorage.getItem('token');
const userId =  localStorage.getItem('userId');
console.log(title);
console.log(description);
console.log(responsable);
console.log(project);
console.log(userId);


const response = await fetch(process.env.API_URI+'/api/tasks/', {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      "title": title,
      "description": description,
      "author": userId,
      "project": project,
      "responsable" : responsable
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
 
  
  const response = await fetch(process.env.API_URI+'/api/tasks/' + taskId, {
      method: 'PUT',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "status": status,
    }
    )
  
  });
  
  const data = await response.json();
  
  if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
  }
  
  return data;
  };

export const updateTask = async (title, description, responsable, taskId) => {

  const token = localStorage.getItem('token');

  console.log("taskId"+ taskId);
  console.log("titre:" + title);
  console.log("description:" + description);
  console.log("responsable:" + responsable);
  
  const response = await fetch(process.env.API_URI+'/api/tasks/' + taskId, {
      method: 'PUT',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "title": title,
        "description": description,
        "responsable": responsable
    }
    )
  
  });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
    }
    
    return data;
};

export const deleteTask = async (taskId) => {

  const token = localStorage.getItem('token');
  console.log(taskId);
  const response = await fetch(process.env.API_URI+'/api/tasks/' + taskId, {
      method: 'DELETE',
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