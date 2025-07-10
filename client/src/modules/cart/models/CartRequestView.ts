export interface CartProduct{
    product: string; /* product means Id of product */
    count: 1;
    price: number;  
}

export interface CartRequestView{
    products: CartProduct[];
    total: number;
    tax: number;
    grandTotal: number 
} 