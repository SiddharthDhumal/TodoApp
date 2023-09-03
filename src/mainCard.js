import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function MainCard() {
  const [TodoList, setTodoList] = useState([
    { id: uuid(), task: "Task-1" },
    { id: uuid(), task: "Task-2" },
  ]);
  const [currentId, setCurrentId] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [checkboxId, setCheckboxId] = useState([]);

  localStorage.setItem("tasks", JSON.stringify(TodoList));

  function EditFn(id) {
    TodoList.map((item) => {
      if (id === item.id) {
        setCurrentId([...currentId, id]);
      }
    });
  }

  function SaveFn(evt, id) {
    console.log(evt);
    console.log(evt.target.onkeypress);
    setCurrentId(currentId.filter((item) => item !== id));
  }

  function ChangeTaskFn(e, id) {
    if (!e.target.value) {
      alert("Notes can't be empty");
    }
    const updatedTodo = TodoList.map((item) => {
      if (id === item.id) {
        return { ...item, task: e.target.value };
      }
      return item;
    });

    setTodoList(updatedTodo);
  }

  function DeleteFn(id) {
    const deleteTodo = TodoList.filter((item) => item.id !== id);
    setTodoList(deleteTodo);
  }

  function AddNewTodoFn() {
    if (newTodo.length) {
      setTodoList([...TodoList, { id: uuid(), task: newTodo }]);
      setNewTodo("");
    }
  }

  function handleCheked(e, idx) {
    if (e.target.checked === true && !checkboxId.includes(idx)) {
      setCheckboxId([...checkboxId, idx]);
    } else if (e.target.checked === false) {
      const deleteCheckboxId = checkboxId.filter((ItemId) => {
        return ItemId !== idx;
      });
      setCheckboxId(deleteCheckboxId);
    }
  }

  return (
    <main className="main">
      <div className="header">
        <h1>Todo List</h1>
        <p>A Simple React Todo List App</p>
      </div>
      <hr />
      {TodoList.map((listitems, index) => (
        <div key={listitems.id} className="todo-list">
          {currentId.includes(listitems.id) ? (
            <div className="change-todo">
              <input
                maxLength="40"
                value={listitems.task}
                onChange={(e) => ChangeTaskFn(e, listitems.id)}
              />
              <button
                className="btn"
                onClick={(evt) => SaveFn(evt, listitems.id)}>
                Save
              </button>
            </div>
          ) : (
            <div className="edit-list">
              <div className="tasks">
                <p>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheked(e, index)}
                    style={{ cursor: "pointer", height: "1rem", width: "1rem" }}
                  />
                  <label
                    className={checkboxId.includes(index) ? "checkbox" : ""}>
                    {listitems.task}
                  </label>
                </p>
              </div>
              <div className="tasks-btn">
                <button
                  className={
                    checkboxId.includes(index)
                      ? "disable-btn btn"
                      : "edit-btn btn"
                  }
                  onClick={() => EditFn(listitems.id)}
                  disabled={checkboxId.includes(index) ? true : false}>
                  Edit
                </button>
                <button
                  className="delete-btn btn"
                  onClick={() => DeleteFn(listitems.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="add-new-todo">
        <h3>New ToDo</h3>
        <input
          placeholder="New Todo"
          value={newTodo}
          maxLength="40"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={AddNewTodoFn}>ADD TODO</button>
      </div>
    </main>
  );
}
