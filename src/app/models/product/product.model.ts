export interface Product {
    id: string;                      // Guid in .NET is typically represented as a string in TypeScript
    name: string;
    brand: string;
    description: string;
    unitPrice: number;              // Decimal in .NET is typically represented as a number in TypeScript
    unitQuantity: number;
    volume?: number;                // Optional property
    scent?: string;                 // Optional property
    edition?: string;               // Optional property
    imageData: Uint8Array;          // Byte array can be represented as a Uint8Array
    category: string;
    subcategory: string;
    createdBy: string;              // Optional properties in .NET are usually not optional in TypeScript
    created: Date;                  // DateTime in .NET is represented as Date in TypeScript
    lastModifiedBy?: string;        // Optional property
    lastModified?: Date;            // Optional property
}
