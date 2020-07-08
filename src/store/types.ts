export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    imageUrl: string
}
export interface INormalizedProductsObject {
    [id: string]: IProduct
}

export interface IProductsState {
    products: INormalizedProductsObject
    productIDs: number[]

}

export type TProductsEditPayload = { id: number } &  Partial<Omit<IProduct,'id'>>


export interface ICartItem {
    id: number
    qty: number
}

export interface ICartState {
    [id:string]: number
}
