import "./App.css";
import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDoArray, setToDoArray] = useState([]);

  const addToDo = (e) => {
    e.preventDefault();

    const newToDo = {
      toDoText: toDo,
      completed: false,
    };
    setToDoArray([...toDoArray, newToDo]);
    setToDo("");
  };

  const completeToDo = (indexForToDo) => {
    const toDoUpdate = { ...toDoArray[indexForToDo] };
    if (toDoUpdate.completed === false) {
      toDoUpdate.completed = true;
    } else {
      toDoUpdate.completed = false;
    }

    setToDoArray(
      [...toDoArray.slice(0, indexForToDo), toDoUpdate].concat(
        toDoArray.slice(indexForToDo + 1)
      )
    );
  };

  const deleteToDo = (indexForToDo) => {
    const filteredToDos = toDoArray.filter((toDo, idx) => {
      return indexForToDo !== idx;
    });
    setToDoArray(filteredToDos);
  };

  return (
    <div className="App">
      <h1>To Do List!</h1>
      <form onSubmit={addToDo}>
        <label>Add to list </label>
        <input
          value={toDo}
          type="text"
          onChange={(e) => setToDo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <h3>Your to-dos</h3>
      {toDoArray.map((toDo, index) => {
        return (
          <div key={index}>
            {!toDo.completed ? (
              <p>{toDo.toDoText}</p>
            ) : (
              <p>
                <strike>{toDo.toDoText}</strike>
              </p>
            )}

            <label>
              {" "}
              Completed
              <input type="checkbox" onClick={() => completeToDo(index)} />
              <button onClick={() => deleteToDo(index) }>Delete</button>
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default App;
