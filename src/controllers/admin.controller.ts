import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../models/User.service";

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home Page");
  } catch (err) {
    console.log("Error goHome", err);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page");
  } catch (err) {
    console.log("Error Login", err);
  }
};

adminController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("proccessLogin");
    res.send("DONE")
  } catch (err) {
    console.log("Error proccessLogin", err);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("SignUp Page1");
  } catch (err) {
    console.log("Error SignUp", err);
  }
};

adminController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("SignUp Page1");
  } catch (err) {
    console.log("Error SignUp", err);
  }
};


export default adminController;
