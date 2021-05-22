import {useEffect} from "react";

/* eslint-disable react-hooks/exhaustive-deps */
export default function useDidUnmount(callback: () => any) {
    return useEffect(() => callback, []);
}
