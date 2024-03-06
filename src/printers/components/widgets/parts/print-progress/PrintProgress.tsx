import { useEffect } from "react";

interface PrintProgressProps {
    state: any;
}
export function PrintProgress({ state }: PrintProgressProps) {
    useEffect(() => {
        console.log(state?.print_stats);
    },[state])

    return (
        <div>
            asd
        </div>
    )
}