export interface Category {
    id: string;
    name: string;
    subcategories: string[];
    createdBy: string;
    created: Date;
    lastModifiedBy?: string;
    lastModified?: Date;
}
