import axios from "axios";
export const settings = {
    root: 'https://text-nitrix-backend.herokuapp.com',
    api: '/api',
    auth: '/auth',
    task: '/task'
}

const {root, api, auth, task} = settings

export const token = () => window.localStorage.getItem("token")
export const userId = () => window.localStorage.getItem("userId")

export const apiAddTask = async ({state ,title}) => {
    const res = await axios.post(
        root + api + task + '/add',
        {
            title,
            state,
            token: token(),
            userId: userId()
        })
}

export const apiGetTaskList = async () => {
    const res = await axios.post(
        root + api + task,
        {
            token: token(),
            userId: userId()
        }
    )
    return res
}

export const apiRegister = async payload => {
    const res = await axios.post(
        root + api + auth + '/register',
        {
            ...payload
        }
    )
    return res
}

export const apiLogin = async payload => {

    const res = await axios.post(
        root + api + auth + '/login',
        {
            ...payload
        }
    )
    return res
}

export const apiAuth = async () => {
    try {
        const res = await axios.post(
            root + api + auth,
            {
                token: token()
            }
        )
        return res

    } catch (e) {
        console.log(e)
    }
}

export const apiClearTasks = async () => {
    try {
        const res = await axios.post(
            root + api + task + '/clear',
            {
                token: token(),
                userId: userId(),
            }
        )
        return res
    } catch (e) {
        console.log(e)
    }
}

export const apiUpdateTask = async ({taskId, title, state}) => {
    try {
        const res = await axios.post(
            root + api + task + '/update',
            {
                token: token(),
                userId: userId(),
                taskId,
                title,
                state
            }
        )
        return res

    } catch (e) {
        console.log(e)
    }

}