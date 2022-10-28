import {Outlet as OutletDOM} from "react-router-dom";
import {DependencyList, FC, useCallback, useEffect} from "react";

export function useFocus(callback: (isFirstFocus: boolean) => void): void {
    callback(true)
}

export function useUnFocus(callback: () => void) {
    useEffect(() => {
        return callback
    }, [])
}

const Outlet: FC = () => {
    // const location = useLocation()
    return (<OutletDOM/>)
}
export default Outlet;