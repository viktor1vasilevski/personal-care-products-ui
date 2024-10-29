export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    unitPrice: number;
    unitQuantity: number;
    volume?: number;
    scent?: string;
    edition?: string;
    imageData: Uint8Array;
    category: string;
    subcategory: string;
    createdBy: string;
    created: Date;
    lastModifiedBy?: string;
    lastModified?: Date;
}
