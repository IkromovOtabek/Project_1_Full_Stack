import express, { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../models/User.service";
import { AdminRequest, LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const userService = new UserService();

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error goHome", err);
    res.redirect("/admin");
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error SignUp", err);
    res.redirect("/admin");
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error Login", err);
    res.redirect("/admin");
  }
};

adminController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("getSignup");
    const file = req.file;
    if(!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    
    const newUser: UserInput = req.body;
    newUser.userImage = file?.path.replace(/\\/g, "/");
    newUser.userType = UserType.ADMIN;
    const result = await userService.processSignup(newUser);

    req.session.user = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error SignUp", err);
    const message =
      err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert('${message}'); window.location.replace('/admin/signup') </script>`,
    );
  }
};

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("proccessLogin");
    const input: LoginInput = req.body;
    const result = await userService.processLogin(input);

    req.session.user = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error proccessLogin", err);
    const message =
      err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert('${message}'); window.location.replace('/admin/login') </script>`,
    );
  }
};

adminController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error logout", err);
    res.redirect("/admin");
  }
};

adminController.getUsers = async (req: Request, res: Response) => {
   try {
       console.log("getUsers");
       const result = await userService.getUsers();
       console.log("result:", result);
       
       res.render("users", {users: result}); // users.ejs faylini render qilish 
   } catch(err) {
    console.log("Error, getUsers:", err);
    res.redirect('/admin/login');
   }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
   try {
       console.log("updateChosenUser");
       const result = await userService.updateChosenUser(req.body);

       res.status(HttpCode.OK).json({ data: result });
   } catch(err) {
    console.log("Error, updateChosenUser:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
   }
};

adminController.checkAuthSesson = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSesson");
    if (req.session?.user)
      res.send(`<script>alert("Hi ${req.session.user.userNick}");</script>`);
    else res.send(`<script>alert('${Message.NOT_AUTHENTICATED}');</script>`);
  } catch (err) {
    console.log("Error checkAuthSesson", err);
    res.send(err);
  }
};

adminController.verifyAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.user?.userType === UserType.ADMIN) {
    req.user = req.session.user;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script>alert('${message}'); window.location.replace('/admin/login'); </script>`,
    );
  }
};

export default adminController;
