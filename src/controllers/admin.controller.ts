import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../models/User.service";
import { AdminRequest, LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";
import { Message } from "../libs/Errors";

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

    const newUser: UserInput = req.body;
    newUser.userType = UserType.ADMIN;
    const result = await userService.processSignup(newUser);

    req.session.user = result;
    req.session.save(function () {
      res.send(result);
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
      res.send(result);
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

export default adminController;
