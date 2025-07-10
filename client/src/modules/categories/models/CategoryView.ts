export interface SubCategoryView{
    _id? : string;
    name : string;
    description : string;
    isChecked? : boolean;
    /* isChecked is used for filtering purpose like mens wear, kids wear */
}


export interface CategoryView{
    _id? : string;
    name: string;
    description: string;
    isChecked? : boolean;
    subCategories : SubCategoryView[];
    createdAt?: Date;
    updatedAt?: Date;
    /* isChecked is used for filtering purpose */
}

