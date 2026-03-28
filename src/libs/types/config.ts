export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;


// stringni ObjectId ga aylantirish uchun yordamchi funksia
import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
    return typeof target === 'string' ? new mongoose.Types.ObjectId(target) : target;
};