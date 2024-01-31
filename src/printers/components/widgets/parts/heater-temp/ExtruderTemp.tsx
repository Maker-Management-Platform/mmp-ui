import { Temp } from "../temp/Temp";
import Printer3dNozzleHeatOutlineIcon from "mdi-react/Printer3dNozzleHeatOutlineIcon";

interface HeaterTempProps {
    state: any;
}


export function ExtruderTemp({ state }: HeaterTempProps) {
    return (
        <Temp icon={<Printer3dNozzleHeatOutlineIcon />} current={state?.extruder?.temperature} target={state?.extruder?.target}/>
    )
}