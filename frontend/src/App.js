import { useState, useEffect } from 'react';
 
function App() {

  const [Todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const gettodos = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos`,
        { method: "GET" },
      );
      const todos = await response.json();
      setTodos(todos);
    };

    gettodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos`, 
      {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({task}),
      },
    );

    const newTodo =await response.json();
    setTask("");

    setTodos([...Todos, newTodo]);

  };

  const deleteTodo = async (todoId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoId}`,
      { method: "DELETE" },
    );

    if (!response.ok) return;

    setTodos ((prev) => prev.filter((todo) => todo._id !== todoId))
  }

  return (
    <div>
      <h1 className='h1'>Task manager</h1>
      <div>
        <form className='form' onSubmit={createTodo}>
          <input className='input' type='text' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Enter any todos here...'/>
          <button type='submit' className='submit-btn'>Submit</button>
        </form>
      </div>
      <div>
        {Todos.length > 0 ? (
          Todos.map((todo) => (
          <div className='todos'>
            <p>{todo.task}</p>
            <p>{todo.status ? "completed" : "pending"}</p>
            <button onClick={() => deleteTodo(todo._id)} className='dlt-btn'>Delete</button>
          </div>
          ))
        ): (
            <div>
              <h1>No todos found</h1>
            </div>
        )}
      </div>
    </div>
  )
};

export default App;