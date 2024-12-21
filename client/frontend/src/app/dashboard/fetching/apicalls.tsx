
/*
@USECASE Can be used for AUTH and to get the list of user goals which can be then cached.
*/
const getTodos = async (token : string | null) => {
    const response = await fetch('http://localhost:3000/api/goals', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch goals');
    }
    // returns this [goalsshcema]
    /*

    [{
    "_id": "67642bdab38ceb0a2c0a0215",
    "name": "test",
    "deadline": "2024-12-31",
    "isCompleted": false,
    "user": "675aaff1177db4712f716ee1",
    "postingDate": "2024-12-19T14:21:14.373Z",
    "__v": 0
    }]
    
    */
    const data = await response.json();
    console.log(data)
    return data
};

const postTodo = async (name : string, token : string | null) => {
    if (name.trim()) {
        // Make a POST request to the API
        await fetch('http://localhost:3000/api/goals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization' : `${token}`
          },
          body: JSON.stringify({ name: name.trim() }),
        }).catch(e => console.log(e))

    }
  }

  const deleteTodo = async (_id : string, token : string | null) => {
    try {
        const response = await fetch(`http://localhost:3000/api/goals/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

const putTodo = async (_id: string, token : string | null) => {
    try {
        const updatedTodo = {
            // Include other fields as per your model schema
                isCompleted: true,
                // can findByIdAndUpdate in mongoose update only one field at a time and leave the others unchanged?
        };

        const response = await fetch(`http://localhost:3000/api/goals/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(updatedTodo)
        });

        if (!response.ok) {
            throw new Error('Failed to update todo');
        }

        const result = await response.json();
        console.log('Updated todo:', result);
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

export { getTodos, postTodo, putTodo, deleteTodo }