// import { Image } from 'cloudinary-react';

export const cloudinaryService = {
    uploadImg,
    dataURLtoFile,
    uploadCanvasImg
}

async function uploadImg(ev) {
    const CLOUD_NAME = "cloudinary-img"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'ml_default');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.secure_url
    } catch (err) {
        console.log(err);
    }
}
 function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return  new File([u8arr],filename,{type:mime});
}

async function uploadCanvasImg(file) {
    const CLOUD_NAME = "cloudinary-img"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.secure_url
    } catch (err) {
        console.log(err);
    }
}



