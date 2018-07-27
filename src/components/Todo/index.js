/*
  Imports:
    - todo.css for styling

  Props:
    - title
    - isComplete
    - onToggleComplete
    - onDelete

  Output:
    renders:
      - a div
        - has the class "todo-item"
        - contains a span
          - renders the title prop
          - has the class "todo-title"
        - contains a checkbox 
          - has the class "todo-complete-toggle"
          - checked attribute is true when isComplete is true
          - checked attribute is false when isComplete is false
          - calls onToggleComplete prop on change <-- change not click so we keep keyboard interactivity
        - contains a button 
          - has the text "remove" 
          - has a class "todo-remove"
          - calls onDelete prop on click
*/

import React from 'react'

export default ({ title, isComplete, onToggleComplete, onDelete }) => (
  <div className="todo-item">
    <span className="todo-title">{title}</span>
    <input
      type="checkbox"
      className="todo-complete-toggle"
      checked={isComplete}
      onChange={onToggleComplete}
    />
    <button className="todo-remove" onClick={onDelete}>
      remove
    </button>
  </div>
)
