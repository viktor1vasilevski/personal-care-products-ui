export interface SubcategoryRequest {
    skip: number;
    take: number;
    name: string;
    categoryId: string | null;
    sort: string;
}