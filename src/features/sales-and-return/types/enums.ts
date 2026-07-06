export type PaymentStatus = "PAID" | "PENDING" | "PARTIAL";
export type InvoiceType = "SALE" | "RETURN" | "DAMAGE";
export type InvoiceStatus = "DRAFT" | "POSTED" | "CANCELLED";
export type SaleType = "NORMAL" | "CUSTOMER_REQUEST"; 
export type BatchStatus = 
    | 'ACTIVE'
    | 'EXPIRED'
    | 'DEPLETED';