export type SupplierInvoiceStatus = 
    | 'PENDING'
    | 'PARTIALLY_STOCKED'
    | 'STOCKED'
    | 'CANCELLED';


export type PaymentStatus = 
    | 'PENDING'
    | 'PAID'
    | 'PARTIAL';

export type BatchStatus = 
    | 'ACTIVE'
    | 'EXPIRED'
    | 'DEPLETED';

export type InvoiceStatus =  // later question
    | 'PENDING'
    | 'PAID'
    | 'PARTIAL';