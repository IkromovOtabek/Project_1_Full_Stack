// Fayllarni saqlash uchun konfiguratsiya
import path from "path";
import multer from "multer";
import { v4 } from "uuid";

// MULTER IMAGE UPLOADER
function getTargetImageStorage(addres: any) {
    return multer.diskStorage({
        destination: function (req, file, cb) { // Fayllar qayerga saqlanishi
            cb(null, `./uploads/${addres}`); // Fayllar qayerga saqlanishi
        },
        filename: function (req, file, cb) { // Fayl nomi
            const extension = path.parse(file.originalname).ext; // Fayl kengaytmasi
            const random_name = v4() + extension; // Yagona nom yaratamiz
            cb(null, random_name); // Fayl nomi
        },
    });
}

const makeUploader = (address: string) => {
    const storage = getTargetImageStorage(address);
    return multer({storage: storage});
};


export default makeUploader;

// Fayllarni yuklash uchun storage yaratamiz
// const product_storage = multer.diskStorage({
//   // Fayllarni saqlash uchun konfiguratsiya
//   destination: function (req, file, cb) {
//     // Fayllar qayerga saqlanishi
//     cb(null, "./uploads/products"); // Fayllar qayerga saqlanishi
//   },
//   filename: function (req, file, cb) {
//     // Fayl nomi
//     console.log("file:", file); // Fayl haqida ma'lumot
//     const extension = path.parse(file.originalname).ext; // Fayl kengaytmasi
//     const random_name = v4() + extension; // Yagona nom yaratamiz
//     cb(null, random_name); // Fayl nomi
//   },
// });

// export const uploadProductImage = multer({ storage: product_storage }); // produkt rasm uchun uploader
