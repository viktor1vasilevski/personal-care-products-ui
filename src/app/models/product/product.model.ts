export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    unitPrice: number;
    unitQuantity: number;
    volume?: number; // Optional
    scent?: string; // Optional
    edition?: string; // Optional
    image?: Uint8Array; // Renamed for consistency
    category: string; // Could be an ID if applicable
    subcategory: string; // Could be an ID if applicable
    createdBy: string;
    created: Date;
    lastModifiedBy?: string; // Optional
    lastModified?: Date; // Optional
  }
  
