import { Container } from "@mantine/core";
import { Printer } from "@/printers/entities/Printer";
import { PrinterForm } from "../../../parts/printer-form/PrinterForm";

export function AddPrinter() {
    return (<>
        <Container>
            <PrinterForm printer={{ name: '', type: '', address: '' } as Printer} onPrinterChange={function (p: Printer): void {
                throw new Error("Function not implemented.");
            }} />
        </Container>
    </>)
}