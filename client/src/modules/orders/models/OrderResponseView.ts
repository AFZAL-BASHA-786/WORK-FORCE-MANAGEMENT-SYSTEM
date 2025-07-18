/* export interface Order {
    msg: string;
    order: OrderResponseView;
  } */
export interface OrderResponseView {
    /* Here from server msg will come that is eliminated and managed at service*/
    _id: string;
    products?: (ProductsEntity)[] | null;
    total: number;
    tax: number;
    grandTotal: number;
    paymentType: string;
    orderStatus: string;
    orderBy: OrderBy;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
interface ProductsEntity {
    product: Product;
    count: number;
    price: number;
    _id: string;
  }
interface Product {
    _id: string;
    title: string;
    description: string;
    brand: string;
    imageUrl: string;
    price: number;
    quantity: number;
    sold: number;
    userObj: string;
    categoryObj: string;
    subCategoryObj: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
interface OrderBy {
    _id: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  