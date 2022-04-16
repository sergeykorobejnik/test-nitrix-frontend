import {useCallback, useEffect, useState} from "react";

const useAsync = (fn) => {
    
    const callback = useCallback(() => fn, [fn])

    return callback
}

export {useAsync}