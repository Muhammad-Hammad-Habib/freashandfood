import express from "express";
const sVoucherRoute = express.Router();
import api_svoucher_control from "../controller/api_svoucher_control.js";


sVoucherRoute.get("/getSaleDetailByCustomer", api_svoucher_control.getSaleDetailByCustomer)
sVoucherRoute.get("/test", api_svoucher_control.test)
sVoucherRoute.get("/get_data", api_svoucher_control.get_data)


export default sVoucherRoute  