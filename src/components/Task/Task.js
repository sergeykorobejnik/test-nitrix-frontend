import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {updateTask} from "../../redux/actions/actions";

const TaskHolder = styled.div` 
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 15px;
  font-size: 16px;
  font-weight: 500;
  background: #eee;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch; 
  transition: .5s ease-in-out;
  color: ${({state}) => state === 0 ? '#000' : '#B3B3B3'};
  .change-task {
    width: calc(100% - 20px);
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s ease-in-out;
    opacity: ${({isVisible}) => isVisible ? '1' : 0 };
    z-index: ${({isVisible}) => isVisible ? '1' : -1 };
  }
`

const Task = ({title, taskId, state}) => {

    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [timer, setTimer] = useState(null)

    const handleClick = ({taskId, title, state} ,event) => {
        event.stopPropagation()
        const {detail} = event

        //Single click
        console.log(state)

        if (detail === 1) {
            setTimer(setTimeout(() => {
                dispatch(updateTask({taskId, title, state: !state}))
            }, 500))
        }

        //DoubleClick
        if (detail === 2) {
            console.log('double')
            setIsVisible(!isVisible)
            clearTimeout(timer)
        }
    }


    const handleInput = ({taskId, state} ,event) => {
        const {key} = event
        const {value} = event.target


        if (key === "Enter") {
            dispatch(updateTask({taskId, title: value, state: 0}))
            setIsVisible(false)
        }
        if(key === "Escape") {
            setIsVisible(false)
        }
    }




    return (
        <TaskHolder
            isVisible={isVisible}
            state={state}
            onClick={handleClick.bind(null, {title, taskId, state})}
        >
            <input type="text"
                   className={'change-task'}
                   value={input}
                   placeholder="Change your task..."
                   onKeyDown={handleInput.bind(null, {taskId, state})}
                   onClick={(event => event.stopPropagation())}
                   onDoubleClick={() => setIsVisible(false)}
                   onChange={event => setInput(event.target.value)}
                   />
            <span>{title}</span>
        </TaskHolder>
    );
};

export default Task;