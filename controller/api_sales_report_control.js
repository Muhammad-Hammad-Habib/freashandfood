import dotenv from "dotenv"
dotenv.config()
import { QueryTypes } from "sequelize";
import sequelize from "../config/connect_db.js";
import jsreportClient from 'jsreport-client';


class api_sales_report_control {

    // Get Data and create PDF
    static getSalesReportByCustomer = async (req, resp) => {
        try {
            const result = await sequelize.query("SELECT Customer.CustomerName, SVdetails.SVoucherDetailItemParticulars, SVdetails.SVoucherDetailSalePrice,  SVdetails.SVoucherDetailUOMName, SUM(SVdetails.SVoucherDetailQTY) AS SVoucherDetailQTY, SUM(SVdetails.SVoucherDetailTotalAmount) AS SVoucherDetailTotalAmount, SVoucherDate FROM `SVoucher` JOIN `SVoucherDetail` AS SVdetails ON SVoucherId = SVoucherDetailSVoucherId JOIN `Customer` ON CustomerId = SVoucherCustomerId WHERE SVoucherCustomerId = 4582 GROUP BY SVdetails.SVoucherDetailItemParticulars", {
                replacements: req.body,
                type: QueryTypes.SELECT
            })
            this.report(req, resp, result)
        } catch (error) {
            resp.json({
                status: "0",
                message: `getSaleDetailByCustomer function error ${error}`
            })
        } 
    }
 
    // Use to Create PDF from jsReport localserver
    static report = async (req, resp, result) => {
        try {
            const jsreport = jsreportClient(process.env.PCC_REPORT_SERVER);
            jsreport.render({
                template: {
                    shortid: "BJen4M1JHle",
                },
                data: {
                    data: result
                }
            }).then((response) => {
                // resp.setHeader("Content-Type", "application/pdf");
                // resp.setHeader("Content-Disposition", "attachment; filename=report.pdf");
                response.pipe(resp)
                // resp.send("hello")
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            resp.json({
                status: "0",
                message: `report error ${error}`
            })
        }
    }

    // __________________________________________________________________

    // for Developer Use
    static test_sales_report = async (req, resp) => {
        try {
            const jsreport = jsreportClient(process.env.PCC_REPORT_SERVER);
            jsreport.render({
                template: {
                    shortid: "BJen4M1JHle",
                    // engine: "jsrender",
                    // recipe: "chrome-pdf" 
                },
                data: {
                    data: [
                        {
                            name: "hammad"
                        },
                        {
                            name: "ali"
                        },
                        {
                            name: "shaikh"
                        }
                    ]
                }
            }).then((response) => {
                resp.setHeader("Content-Type", "application/pdf");
                // resp.setHeader("Content-Disposition", "attachment; filename=report.pdf");
                response.pipe(resp)
                // resp.send("hello")
            })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            resp.json({
                status: "0",
                message: `test_sales_report error ${error}`
            })
        }
    }

    // for Developer Use
    static test_data_sales_report = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT Customer.CustomerName, SVdetails.SVoucherDetailItemParticulars, SVdetails.SVoucherDetailSalePrice,  SVdetails.SVoucherDetailUOMName, SUM(SVdetails.SVoucherDetailQTY) AS SVoucherDetailQTY, SUM(SVdetails.SVoucherDetailTotalAmount) AS SVoucherDetailTotalAmount, SVoucherDate FROM `SVoucher` JOIN `SVoucherDetail` AS SVdetails ON SVoucherId = SVoucherDetailSVoucherId JOIN `Customer` ON CustomerId = SVoucherCustomerId WHERE SVoucherCustomerId = 4582 GROUP BY SVdetails.SVoucherDetailItemParticulars", {
                replacements: req.body,
                type: QueryTypes.SELECT
            }
            )
            resp.json({
                status: "1",
                message: `Successfully get ${result.length} records`,
                data: result
            })
        } catch (error) {
            resp.json({
                status: "0",
                message: `test_data_sales_report function error ${error}`
            })
        }
    }
}

export default api_sales_report_control;