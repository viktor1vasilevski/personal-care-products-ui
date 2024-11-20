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
    imageData?: string; // Renamed for consistency
    category: string; // Could be an ID if applicable
    subcategory: string;
    subcategoriesDropdownList: any[];
    createdBy: string;
    created: Date;
    lastModifiedBy?: string; // Optional
    lastModified?: Date; // Optional
  }
  
