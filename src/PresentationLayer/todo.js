import React, { useEffect, useState } from "react";
import fetchTodoList from "../ApiLayer/todoApi";
import filterTodo from "../BusinessLayer/filterTodos";

function renderTodo({ todo, handleTodoClick }) {
  return (
    <div key={todo.id} className="flex items-center border-4 border-gray p-5">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleTodoClick(todo)}
        id={`checkbox-${todo.id}`}
        className="mr-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label for={`checkbox-${todo.id}`} className="w-full cursor-pointer">
        {todo.todo}
      </label>
    </div>
  );
}

function Heading({ title }) {
  return <h2 className="text-center my-10">{title}</h2>;
}

function renderTodoShimmer() {
  return (
    <div className="animate-pulse flex items-center space-x-4 p-5">
      <div className="h-10 w-full bg-indigo-300 rounded"></div>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTodoList()
      .then((data) => {
        const [open, completed] = filterTodo(data);
        setLoading(false);
        setTodos(open);
        setcompletedTodos(completed);
      })
      .catch(() => {
        console.error("Something went wrong!");
        setLoading(false);
      });
  }, []);

  const handleTodoClick = (todo) => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    const updatedCompleted = [...completedTodos, todo];
    setTodos(updatedTodos);
    setcompletedTodos(updatedCompleted);
  };
  return (
    <div class="container mx-auto py-20">
      <div>
        <Heading title="I did it!" />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 bg-lightGreen p-20">
          {completedTodos.map((item) => (
            <div
              key={item.id}
              data-testid="completed-todo"
              className="flex justify-center p-6 bg-white shadow-md"
            >
              {item.todo}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Heading title="To Do" />
        <div className="border-8 border-gray">
          {loading ? (
            <div>
              {renderTodoShimmer()}
              {renderTodoShimmer()}
              {renderTodoShimmer()}
            </div>
          ) : (
            todos.map((todo) => renderTodo({ todo, handleTodoClick }))
          )}
        </div>
      </div>
      <Heading title="Task Board by Abhishek" />
    </div>
  );
}

export default TodoList;
