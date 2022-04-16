import {
    CHANGE_AUTH_STATE, CLEAR_ERROR,
    FILTER_BY,
    FILTER_CLEAR,
    PUSH_SINGLE_TASK,
    PUSH_TASKS_TO_STATE,
    SET_NEW_ERROR
} from "../actions/actioTypes";
import produce from "immer";

const initialState = {
    isAuth: false,
    error: "",
    taskArr: [],
    filteredArr: []
}

function appState (state = initialState, action) {
    switch (action.type) {
        case CHANGE_AUTH_STATE : {
            return produce(state, draft => {
                draft.isAuth = action.payload
            })
        }

        case SET_NEW_ERROR : {
            return produce(state, draft => {
                draft.error = action.payload
            })
        }

        case CLEAR_ERROR : {
            return produce(state, draft => {
                draft.error = ""
            })
        }

        case PUSH_TASKS_TO_STATE : {
            return produce(state, draft => {
                draft.taskArr = action.payload
            })
        }

        case PUSH_SINGLE_TASK : {
            return produce(state, draft => {
                draft.taskArr.push(action.payload)
            })
        }

        case FILTER_CLEAR : {
            return produce(state, draft => {
                draft.filteredArr.length = 0
            })
        }

        case FILTER_BY : {
            return produce(state, draft => {

                if(action.payload === 'pending') {
                    draft.filteredArr = state.taskArr.filter(task => {
                        return task.state === 0
                    })
                }
                if(action.payload === 'complete') {
                    draft.filteredArr = state.taskArr.filter(task => {
                        return task.state === 1
                    })
                }
            })
        }

    }
    return state
}

export {appState}