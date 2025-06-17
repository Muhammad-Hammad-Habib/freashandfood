import express from "express";
const sVoucherRoute = express.Router();
import api_svoucher_control from "../controller/api_svoucher_control.js";


sVoucherRoute.get("/getSaleDetailByCustomer", api_svoucher_control.getSaleDetailByCustomer)


export default sVoucherRoute  