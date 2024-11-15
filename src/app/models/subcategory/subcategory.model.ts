export interface Subcategory {
    id: string;
    name: string;
    categories: any[],
    createdBy: string;
    created: Date;
    lastModifiedBy?: string;
    lastModified?: Date;
}
