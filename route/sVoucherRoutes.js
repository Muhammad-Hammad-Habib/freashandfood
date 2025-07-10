import express from "express";
const sVoucherRoute = express.Router();
import api_svoucher_control from "../controller/api_svoucher_control.js";
import api_reporting_control from "../controller/api_reporting_control.js";
import api_sales_report_control from "../controller/api_sales_report_control.js";
import api_forecast_control from "../controller/api_forecast_control.js";


sVoucherRoute.get("/getSaleDetailByCustomer", api_svoucher_control.getSaleDetailByCustomer)

sVoucherRoute.get("/test", api_svoucher_control.test)
sVoucherRoute.get("/get_data", api_svoucher_control.get_data)

// ________________________________________________


sVoucherRoute.get("/getCustomerInvoice", api_reporting_control.getCustomerInvoice)

sVoucherRoute.get("/test_data", api_reporting_control.test_data)
sVoucherRoute.get("/test_report", api_reporting_control.test_report)

// ________________________________________________


sVoucherRoute.get("/getSalesReportByCustomer", api_sales_report_control.getSalesReportByCustomer)

sVoucherRoute.get("/test_sales_report", api_sales_report_control.test_sales_report)
sVoucherRoute.get("/test_data_sales_report", api_sales_report_control.test_data_sales_report)


// ________________________________________________


sVoucherRoute.get("/getSalesForecast", api_forecast_control.getSalesForecast)

sVoucherRoute.get("/test_sales_forecast_report", api_forecast_control.test_report_SalesForecast)
sVoucherRoute.get("/test_data_sales_forecast", api_forecast_control.test_data_SalesForecast)


export default sVoucherRoute  