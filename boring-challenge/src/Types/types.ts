export interface Activity {
    accessibility: number,
    activity: string,
    key: number,
    link: string,
    participants: number,
    price: number,
    type: string,
}

export interface Filters {
    type: string,
    participants: number,
    minPrice: number,
    maxPrice: number,
    minAccessibility: number,
    maxAccessibility: number,
}