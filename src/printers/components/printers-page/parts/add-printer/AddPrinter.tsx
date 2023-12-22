import { Container } from "@mantine/core";
import { Printer } from "@/printers/entities/Printer";
import { PrinterForm } from "../../../parts/printer-form/PrinterForm";
import { useNavigate } from "react-router-dom";

export function AddPrinter() {
    const navigate = useNavigate();
    return (<>
        <Container>
            <PrinterForm printer={{ name: '', type: '', address: '' } as Printer} onPrinterChange={function (p: Printer): void {
                navigate("/printers")
            }} />
        </Container>
    </>)
}