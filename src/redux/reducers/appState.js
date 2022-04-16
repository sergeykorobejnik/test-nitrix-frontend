import {CHANGE_AUTH_STATE, FILTER_BY, FILTER_CLEAR, PUSH_SINGLE_TASK, PUSH_TASKS_TO_STATE} from "../actions/actioTypes";
import produce from "immer";

const initialState = {
    isAuth: false,
    error: {
        isError: false,
        body: ''
    },
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