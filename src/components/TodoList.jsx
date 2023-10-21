import styles from '../styles/todolist.module.css'
import { useState } from 'react'

const TodoList = ( { id, content, onDelete, onUpdate } ) => {
  const [toggle, setToggle] = useState(true)
  const [newTask, setNewTask] = useState(content)

  const handleDelete = ()=> {
    onDelete(id)
  }

  const handleUpdate = ()=> {
    setToggle(false)
  }

  const handleSave = ()=> {
    setToggle(true)
    onUpdate(newTask, id)
  }

  return (
    <div>
      <ul>
        <li className={styles.card_container} >
          <div className={styles.card}>
          {
            toggle ? 
            <>
              <p className={styles.cookieHeading}>{content}</p>
              <div className={styles.buttonContainer}>
                <button className={styles.acceptButton} onClick={handleUpdate} >Update</button>
                <button className={styles.declineButton} onClick={handleDelete} >Delete</button>
              </div>
            </>
            :
            <div className={styles.input_section}>
              <input
                type="text"
                name="text"
                className={styles.input}
                value={newTask}
                onChange={(e)=> setNewTask(e.target.value)}
              />
              <button className={styles.acceptButton} onClick={handleSave} >Save</button>
            </div>
          }
          </div>
        </li>
      </ul>
    </div>
  )
}

export default TodoList
