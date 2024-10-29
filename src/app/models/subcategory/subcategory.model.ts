export interface Subcategory {
    id: string; // Use string to represent Guid
    name: string;
    createdBy: string;
    created: Date;
    lastModifiedBy?: string; // Optional property
    lastModified?: Date; // Optional property
}
