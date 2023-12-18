import { EditPrinterPage } from "./components/edit-printer-page/EditPrinterPage";
import {PrintersPage} from "./components/printers-page/PrintersPage";

export const routes = [
    {
        path: '',
        index: true,
        element: <PrintersPage/>
    },
    {
        path: ':id',
        element: <EditPrinterPage/>
    }
]