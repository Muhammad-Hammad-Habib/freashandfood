import dotenv from "dotenv"
dotenv.config()
import { QueryTypes } from "sequelize";
import sequelize from "../config/connect_db.js";
import jsreportClient from 'jsreport-client';


class api_reporting_control {

    // Get Data and create PDF
    static getCustomerInvoice = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT SVoucherId, SVoucherQTYTotal, SVoucherNo, SVoucherDate, SVoucherQTYTotal, SVoucherNetAmount, SVoucherCustomerId, SVdetails.SVoucherDetailId ,SVdetails.SVoucherDetailItemParticulars, SVdetails.SVoucherDetailSalePrice, SVdetails.SVoucherDetailQTY, SVdetails.SVoucherDetailTotalAmount, SVdetails.SVoucherDetailNetAmount, Customer.CustomerName FROM `SVoucher` JOIN `SVoucherDetail` AS SVdetails ON SVoucherId = SVoucherDetailSVoucherId JOIN `Customer` ON CustomerId = SVoucherCustomerId WHERE SVoucherId = :SVoucherId;",
                {
                    replacements: req.body,
                    type: QueryTypes.SELECT
                }
            )
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
                    shortid: "zT~F0g3",
                    // engine: "jsrender",
                    // recipe: "chrome-pdf" 
                },
                data: {
                    data: result
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
                message: `test function error ${error}`
            })
        }
    }



    // __________________________________________________________________



    // for Developer Use
    static test_report = async (req, resp) => {
        try {
            const jsreport = jsreportClient(process.env.PCC_REPORT_SERVER);
            jsreport.render({
                template: {
                    shortid: "zT~F0g3",
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
                message: `test function error ${error}`
            })
        }
    }

    // for Developer Use
    static test_data = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT SVoucherId, SVoucherNo, SVoucherDate, SVoucherQTYTotal, SVoucherNetAmount, SVoucherCustomerId, SVdetails.SVoucherDetailId ,SVdetails.SVoucherDetailItemParticulars, SVdetails.SVoucherDetailSalePrice, SVdetails.SVoucherDetailQTY, SVdetails.SVoucherDetailTotalAmount, SVdetails.SVoucherDetailNetAmount, Customer.CustomerName FROM `SVoucher` JOIN `SVoucherDetail` AS SVdetails ON SVoucherId = SVoucherDetailSVoucherId JOIN `Customer` ON CustomerId = SVoucherCustomerId WHERE SVoucherId = :SVoucherId;",
                {
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
                message: `getSaleDetailByCustomer function error ${error}`
            })
        }
    }
}

export default api_reporting_control;