import { Event } from './events';

export interface PrinterInfo {
    /** Unique printer ID. */
    id: string;
    /** Printer's human readable name. */
    name: string;
    /** Optional. Printer's human readable description. */
    description?: string | undefined;
}

export interface PrinterCapabilities {
    /** Device capabilities in CDD format. */
    capabilities: any;
}

export interface PrintJob {
    /** ID of the printer which should handle the job. */
    printerId: string;
    /** The print job title. */
    title: string;
    /** Print ticket in  CJT format. */
    ticket: Object;
    /** The document content type. Supported formats are "application/pdf" and "image/pwg-raster". */
    contentType: string;
    /** Blob containing the document data to print. Format must match |contentType|. */
    document: Blob;
}

export interface PrinterRequestedEvent extends Event<(resultCallback: (printerInfo: PrinterInfo[]) => void) => void> {}

export interface PrinterInfoRequestedEvent
    extends Event<(device: any, resultCallback: (printerInfo?: PrinterInfo) => void) => void> {}

export interface CapabilityRequestedEvent
    extends Event<(printerId: string, resultCallback: (capabilities: PrinterCapabilities) => void) => void> {}

export interface PrintRequestedEvent
    extends Event<(printJob: PrintJob, resultCallback: (result: string) => void) => void> {}

export var onGetPrintersRequested: PrinterRequestedEvent;
export var onGetUsbPrinterInfoRequested: PrinterInfoRequestedEvent;
export var onGetCapabilityRequested: CapabilityRequestedEvent;
export var onPrintRequested: PrintRequestedEvent;
