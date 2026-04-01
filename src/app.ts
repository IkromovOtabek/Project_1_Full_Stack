import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from 'morgan';
import { MORGAN_FORMAT } from "./libs/types/config";
import cors from "cors";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";
//TCP 2
const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/** 1-ENTRANCE **/
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/** 2-SESSIONS **/

// express-session middleware ni app ga ulaymiz
app.use(
  session({
    secret: String(process.env.SESSION_SECRET), //3chi tarafdan kelgan cookie ni imzolash uchun ishlatiladi
    cookie: {
      maxAge: 1000 * 3600 * 3, // 3h bzning sessionlarimiz qancha vaqtga saqlanishi kerakligini bildiradi
    },
    store: store, // session ma'lumotlarini qayerda saqlashimizni bildiradi
    resave: true, //agar false bo'lsa har so'rovda session yangilanmaydi true bo'lsa har so'rovda session yangilanadi
    saveUninitialized: true, // serverga birinchi marta ulangan foydalanuvchi uchun yangi session ochiladi
  }),
);
app.use(function (req, res, next) {
  // Middleware har bir so'rovda ishlaydi
  const sessionInstance = req.session as T; // TypeScript uchun
  res.locals.user = sessionInstance.user; // Views ga user ni ulash
  next(); // next ni chaqirmasak keyingi middleware yoki controller ga o'tmaydi
});

/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTERS **/
app.use('/admin', routerAdmin);
app.use('/', router); // Middleware Design Pattern

export default app; //module.exports
