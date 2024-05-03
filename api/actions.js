
export async function fetchTodos (){
    const response =await fetch('http://localhost:8000/todos')
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function createTodo(todo){
  try {
    const response = await fetch('http://localhost:8000/todos', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error; 
  }
}

export async function updateTodo(todo){
  const {id} = todo
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; 
  }
}

export async function deleteTodo(id){
  try {
    const response = await fetch(`http://localHost:8000/todos/${id}`, {   
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error; 
  }
}