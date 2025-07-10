declare const window : Window &
typeof globalThis & {
    cloudinary : {
        createUploadWidget: (p: {},p1: (error:any, result: any) => void) => any
    }
}

export class UploadImageWidget{

    public static upload(cloudinaryRef:any,widgetRef:any){
       return new Promise((resolve,reject)=>{
             // here global cloudinary object is accessed
            cloudinaryRef.current = window.cloudinary;
            /* here since global object is assigned to cloudinaryRef it is accessed by using object methods 
                for widgetRef we assigned global method createUploadWidget.
            */
            widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
                cloudName : process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
                uploadPreset : process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            },(error : any,result : {event:string; info : {secure_url : any};})=>{
                if(!error && result && result.event === "success"){
                    // console.log("Done here is the image info: ",result.info);
                    // console.log(result.info.secure_url); 
                    // secure url is the actual url
                    /* Here setImageUrl will store the image in cloudinary and that url is passed inside of
                        updateProfileAction so that it will store in our database and displays image we
                        uploaded in cloudinary */
                    // setImageUrl(result.info.secure_url);
                    if(result.info.secure_url){
                        resolve(result.info.secure_url.toString());
                    }
                    else{
                        reject("Unable to Upload Image");
                    }
                }
            })
       })
    }

}