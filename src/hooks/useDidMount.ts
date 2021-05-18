import {useEffect} from "react";

/* eslint-disable react-hooks/exhaustive-deps */
export default function useDidMount(callback: () => any) {
    return useEffect(function () {
        callback();
    }, []);
}
