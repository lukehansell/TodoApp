/*
  Props:
    - todos - an array of todo items
      {
        id
        title,
        isComplete
      }
    - onToggleComplete - function which takes an id // (id) => {}
    - onDelete - function which takes an id // (id) => {}
  
  Output:
    - renders a ul
    - maps over the todos and returns a Todo component inside an li
      - passes todo text from todo as title prop
      - passes onCompleteToggle called with todo.id as onCompleteToggle prop
      - passes onDelete called with todo.id as onDelete prop
*/
import React from 'react'
import Todo from '../Todo'

export default ({
  todos = [],
  onToggleComplete = () => {},
  onDelete = () => {}
}) => (
  <ul>
    {todos.map(({ id, text, completed }) => (
      <li key={id}>
        <Todo
          title={text}
          onToggleComplete={onToggleComplete(id)}
          onDelete={onDelete(id)}
          isComplete={completed}
        />
      </li>
    ))}
  </ul>
)
