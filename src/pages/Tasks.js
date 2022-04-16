import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Task from "../components/Task/Task";
import {getTasks, setError} from "../redux/actions/actions";
import {apiAddTask, apiClearTasks} from "../api/api";
import Statistics from "../components/Statistics/Statistics";
import TasksFilter from "../components/TasksFilter/TasksFilter";

const TasksHolder = styled.div`
  background: var(--primary);
  border-radius: 6px;
  max-width: 320px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media only screen and (min-width: 1280px) {
    max-width: 480px;
  }

  h2 {
    margin: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    @media only screen and (min-width: 1280px) {
      font-size: 36px;
    }
  }
  .new-task {
    display: flex;
    align-items: stretch;
    margin-bottom: 20px;
    @media only screen and (min-width: 1280px) {
      margin-bottom: 40px;
    }
  }
  
  input {
    border-radius: 6px;
    border: 2px solid #ddd;
    width: 70%;
    padding: 5px 5px;
    font-size: 16px;
    &::placeholder {
      font-size: 16px;
    }
    @media only screen and (min-width: 1280px) {
      width: 80%;
      padding: 10px 10px;
      font-size: 24px;
      &::placeholder {
        font-size: 24px;
      }
    }
  }
  button {
    margin-left: 5px;
    flex-grow: 1;
    padding: 10px;
    border-radius: 6px;
    border: none;
    font-weight: 700;
    font-size: 24px;
    color: var(--primary);
    background: var(--purple);
    cursor: pointer;
    @media only screen and (min-width: 1280px) {
      font-size: 36px;
      padding: 10px;
    }
  }
  .clear-all {
    font-size: 16px;
    flex-grow: 0;
    @media only screen and (min-width: 1280px) {
      font-size: 24px;
    }
  }
  .tasks-descr-holder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @media only screen and (min-width: 1280px) {
      margin-bottom: 40px;
    }
  }
  .tasks-descr {
    font-size: 16px;
    font-weight: 400;
    @media only screen and (min-width: 1280px) {
      font-size: 24px;
    }
  }
  
  
    
`
const Tasks = props => {
    const dispatch = useDispatch()

    const taskArr = useSelector(({appState}) => appState.taskArr)
    const filteredArr = useSelector(({appState}) => appState.filteredArr)

    const [inputValue, setInputValue] = useState(null)

    const clearTasks = async () => {
        await apiClearTasks()
        dispatch(getTasks())
    }

    const postTask = async inputValue => {
        try {
            await apiAddTask({
                state: 0,
                title: inputValue
            })
            await dispatch(getTasks())
        } catch (e) {
            dispatch(dispatch(setError(e.response.data.message)))
        }
    }

    const handleInput = (event) => {
        console.log(event.key)
        const { value } = event.target
        setInputValue(value)
    }

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    return (
        <TasksHolder>
            <h2>Todo app</h2>
            <div className={'new-task'}>
                <input type="text"
                       name=""
                       id="addNewTask"
                       placeholder={'Add your new todo'}
                       onChange={handleInput}
                />
                <button type={'button'}
                        onClick={() => postTask(inputValue)}
                >+</button>
            </div>
            <TasksFilter/>
            <div className={'current-tasks'}>
                {
                    filteredArr.length === 0 ?
                        taskArr.map(({id, title, state}) => <Task
                            key={id}
                            title={title}
                            taskId={id}
                            state={state}
                        />) :
                        filteredArr.map(({id, title, state}) => <Task
                            key={id}
                            title={title}
                            taskId={id}
                            state={state}
                        />)
                }
            </div>
            <div className="tasks-descr-holder">
                <span className="tasks-descr">
                    You have {taskArr.filter(task => task.state === 0 ).length} pending tasks
                </span>
                <button type={"button"}
                        className={'clear-all'}
                        onClick={clearTasks}
                >Clear All</button>
            </div>
            {
                filteredArr.length !== 0 || <Statistics taskArr={taskArr}/>
            }
        </TasksHolder>
    );
};

export default Tasks;