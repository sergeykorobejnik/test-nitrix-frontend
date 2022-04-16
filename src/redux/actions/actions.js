import {
    CHANGE_AUTH_STATE,
    CLEAR_ERROR,
    FILTER_BY, FILTER_CLEAR,
    PUSH_TASKS_TO_STATE,
    SET_NEW_ERROR
} from "./actioTypes";
import {apiAuth, apiGetTaskList, apiLogin, apiRegister, apiUpdateTask} from "../../api/api";

export const setAuth = (payload) => {
    return {
        type: CHANGE_AUTH_STATE,
        payload
    }
}


export const authCheck = () => async dispatch => {
    try {
        const token = window.localStorage.getItem("token")

        if(!token) return dispatch(setAuth(false))

        const res = await apiAuth()

        if(res.status === 200) dispatch(setAuth(true))

    } catch (e) {
        dispatch(setAuth(false))
        console.log(e)
    }
}

export const userLogin = (payload) => async dispatch => {
    try {

        const res = await apiLogin(payload)

        const {token, userId} = res.data

        if (res.status === 200) {
            window.localStorage.setItem("token", token)
            window.localStorage.setItem("userId", userId)
            dispatch(setAuth(true))
        }
    } catch (e) {
        console.log(e)

    }
}

export const userRegister = (payload) => async dispatch => {
    try {
        const res = await apiRegister(payload)

        const {token, userId} = res.data

        if (res.status === 200) {
            window.localStorage.setItem("token", token)
            window.localStorage.setItem("userId", userId)
            dispatch(setAuth(true))
        }

    } catch (e) {
        console.log(e)
    }
}



export const getTasks = () => async dispatch => {
    try {
        const {data} = await apiGetTaskList()
        dispatch(setTaskArr(data.data))

    } catch (e) {
        console.log(e.message)
    }
}

export const updateTask = payload => async dispatch => {
    try {
        const res = await apiUpdateTask(payload)

        if (res.status === 200) dispatch(getTasks())

    } catch (e) {
        console.log(e.message)
    }
}

const setTaskArr = payload => {
    return {
        type: PUSH_TASKS_TO_STATE,
        payload
    }
}

export const filterBy = payload => {
    return {
        type: FILTER_BY,
        payload
    }
}

export const clearFilter = payload => {
    return {
        type: FILTER_CLEAR,
    }
}



const setError= payload => {
    return {
        type: SET_NEW_ERROR,
        payload
    }

}


const clearError = () => {
    return {
        type: CLEAR_ERROR,
    }
}