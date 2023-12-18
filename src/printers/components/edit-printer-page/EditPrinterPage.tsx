import { SettingsContext } from "@/core/utils/settingsContext";
import useAxios from "axios-hooks";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PrinterForm } from "../parts/printer-form/PrinterForm";

export function EditPrinterPage() {
    const { local_backend } = useContext(SettingsContext);
    const { id } = useParams();

    const [{ data, loading, error }] = useAxios(
        `${local_backend}/printers/${id}`
    );
    return (<>
        <PrinterForm printer={data} onPrinterChange={function (p: any): void {
            throw new Error("Function not implemented.");
        } }/>
    </>)
}