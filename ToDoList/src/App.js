import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [divs, setDivs] = useState([]);
  const [newDivTitle, setNewDivTitle] = useState("");

  useEffect(() => {
    const storedDivs = localStorage.getItem("divs");
    if (storedDivs) {
      setDivs(JSON.parse(storedDivs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("divs", JSON.stringify(divs));
  }, [divs]);

  const addDiv = () => {
    if (newDivTitle) {
      setDivs([
        ...divs,
        {
          id: divs.length,
          title: newDivTitle,
          list: [],
          listInput: "",
          allChecked: false,
        },
      ]);
      setNewDivTitle("");
    }
  };

  const addListItem = (divId) => {
    setDivs(
      divs.map((div) =>
        div.id === divId
          ? {
              ...div,
              list: div.list.concat({ value: div.listInput, checked: false }),
              listInput: "",
            }
          : div
      )
    );
  };

  const handleNewDivTitleChange = (event) => {
    setNewDivTitle(event.target.value);
  };

  const updateDivTitle = (divId, event) => {
    setDivs(
      divs.map((div) =>
        div.id === divId ? { ...div, title: event.target.value } : div
      )
    );
  };

  const updateListItem = (divId, listIndex, event) => {
    setDivs(
      divs.map((div) =>
        div.id === divId
          ? {
              ...div,
              list: div.list.map((item, index) =>
                index === listIndex
                  ? { ...item, value: event.target.value }
                  : item
              ),
            }
          : div
      )
    );
  };

  const handleListInputChange = (divId, event) => {
    setDivs(
      divs.map((div) =>
        div.id === divId ? { ...div, listInput: event.target.value } : div
      )
    );
  };

  const removeDiv = (divId) => {
    setDivs(divs.filter((div) => div.id !== divId));
  };

  const handleCheckboxChange = (divId, listIndex) => {
    setDivs(
      divs.map((div) =>
        div.id === divId
          ? {
              ...div,
              list: div.list.map((item, index) =>
                index === listIndex ? { ...item, checked: !item.checked } : item
              ),
              allChecked: div.list.every((item) => item.checked),
            }
          : div
      )
    );
  };

  return (
    <div className="App">
      <div className="inputButtonContainer">
        <input
          type="text"
          value={newDivTitle}
          onChange={handleNewDivTitleChange}
          placeholder="Add a new to-do list"
        />
        <button onClick={addDiv} className="addButton">
          Add
        </button>
      </div>
      <hr></hr>
      <section className="listGroup">
        {divs.map((div) => (
          <div key={div.id} className="divElement">
            <h2>{div.title}</h2>
            <div className="inputButtonContainer">
              <input
                type="text"
                value={div.listInput}
                onChange={(event) => handleListInputChange(div.id, event)}
                placeholder="Add new task"
              />
              <button onClick={() => addListItem(div.id)} className="addButton">
                Add
              </button>
            </div>
            <ul>
              {div.list.map((item, index) => (
                <li key={index} className="checkboxContainer">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(div.id, index)}
                  />
                  <span> {item.value} </span>
                </li>
              ))}
            </ul>
            <button
              className="removeButton"
              disabled={
                div.list.length === 0 || div.list.some((item) => !item.checked)
              }
              onClick={() => removeDiv(div.id)}
            >
              Complete List
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
