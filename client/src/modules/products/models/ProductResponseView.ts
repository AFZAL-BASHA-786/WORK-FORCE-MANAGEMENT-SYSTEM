/* make Types for json. Link : https://jvilk.com/MakeTypes/ */

export interface ProductResponseView {
    _id: string;
    employeename: string;
    email: string;
    imageUrl?: string;
    mobile: string;
    price: string;
    flat: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    userObj: UserObj;
    categoryObj?: CategoryObj;
    subCategoryObj?: SubCategoryObj;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }
  export interface UserObj {
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
  export interface CategoryObj {
    _id: string;
    name: string; 
    description: string;
    subCategories?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface SubCategoryObj {
    _id: string;
    name: string;
    description: string;
    __v: number;
  }
  