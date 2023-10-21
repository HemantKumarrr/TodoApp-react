import styles from "../styles/todoapp.module.css";
import TodoList from './TodoList'
import { useEffect, useState } from "react";

const TodoApp = () => {
  const [TaskInput, setTaskInput] = useState('')
  const [AllTask, setAllTask] = useState([])

  const onAdd = (e)=> {
    e.preventDefault()
    if(TaskInput === '') {
      alert("Please enter a task !")
    } else {
      let Todos = [...AllTask, TaskInput]
      localStorage.setItem('TodoList', JSON.stringify(Todos))
      setAllTask(Todos)
      setTaskInput('')
    }
  }

  const onDelete = (id)=> {
    let Todos = [...AllTask]
    Todos.splice(id, 1)
    localStorage.setItem('TodoList', JSON.stringify(Todos))
    setAllTask(Todos)
  }

  const onUpdate = (newTask, id ) => {
    let Todos = [...AllTask]
    Todos[id] = newTask
    localStorage.setItem('TodoList', JSON.stringify(Todos))
    setAllTask(Todos)
  }

  useEffect(()=> {
    let savedTodo = localStorage.getItem('TodoList')
    if(savedTodo) {
      let res = JSON.parse(savedTodo)
      setAllTask(res)
    }
  }, [])

  return (
    <div>
      <div className={styles.userInput}>
      <h1>Todo App</h1>
        <div className={styles.info_wrapper}>
          <form onSubmit={onAdd} className={styles.form_items} >
            <div className={styles.input_section}>
              <input
                type="text"
                name="text"
                className={styles.input}
                placeholder="add your Task"
                value={TaskInput}
                onChange={(e)=> setTaskInput(e.target.value)}
              />
            </div>
            <div className={styles.add_btn_section}>
              <button onClick={onAdd} >
                <span className={styles.button_top} >Add</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.all_task}>
        <h2>All Tasks</h2>
      </div>

      <div className={styles.task_list}>
        {
          AllTask.length ?
          AllTask.map((item, index)=> {
            return(
              < TodoList key={index} id={index} content={item} onDelete={onDelete} onUpdate={onUpdate} />
            )
          })
          :
          <div className={styles.no_task_container}>
            <h2>No Task's</h2>
          </div>
        }
      </div>
    </div>
  );
};

export default TodoApp;
