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
    category: string;
    subcategory: string;
    created: Date;
    createdBy: string;
    lastModified: Date;
    lastModifiedBy: string;
  }
  
  