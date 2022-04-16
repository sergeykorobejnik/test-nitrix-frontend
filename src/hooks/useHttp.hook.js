import {useCallback, useEffect} from "react";
import axios from "axios";

const useHttp = ({url, method, data, headers, fn}) => {

    const callback = useCallback(() => {
        const sendReq = async () => {
            try {
                const res = await axios({
                    method,
                    headers,
                    data,
                    url
                })

                if (fn) {
                    fn(res)
                }
            } catch (e) {
                console.log(e)

            }
        }
        sendReq()
    }, [url, method, data, headers])
    return callback
}

export {useHttp}