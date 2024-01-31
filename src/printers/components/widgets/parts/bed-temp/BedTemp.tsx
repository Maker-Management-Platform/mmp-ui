import { Temp } from "../temp/Temp";
import RadiatorDisabledIcon from "mdi-react/RadiatorDisabledIcon";

interface BedTempProps {
    state: any;
}


export function BedTemp({ state }: BedTempProps) {
    return (
        <Temp icon={<RadiatorDisabledIcon />} current={state?.heater_bed?.temperature} target={state?.heater_bed?.target}/>
    )
}