import { SettingsContext } from "@/core/utils/settingsContext";
import useAxios from "axios-hooks";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PrinterForm } from "../parts/printer-form/PrinterForm";

export function EditPrinterPage() {
    const navigate = useNavigate();
    const { local_backend } = useContext(SettingsContext);
    const { id } = useParams();

    const [{ data, loading, error }] = useAxios(
        `${local_backend}/printers/${id}`
    );
    return (<>
        <PrinterForm printer={data} onPrinterChange={function (p: any): void {
            navigate("/printers")
        }} />
    </>)
}