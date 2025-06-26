import express from "express";
const sVoucherRoute = express.Router();
import api_svoucher_control from "../controller/api_svoucher_control.js";
import api_reporting_control from "../controller/api_reporting_control.js";


sVoucherRoute.get("/getSaleDetailByCustomer", api_svoucher_control.getSaleDetailByCustomer)
sVoucherRoute.get("/test", api_svoucher_control.test)
sVoucherRoute.get("/get_data", api_svoucher_control.get_data)

// ________________________________________________


sVoucherRoute.get("/getCustomerInvoice", api_reporting_control.getCustomerInvoice)


sVoucherRoute.get("/test_data", api_reporting_control.test_data)
sVoucherRoute.get("/test_report", api_reporting_control.test_report)





export default sVoucherRoute  