import dotenv from "dotenv"
dotenv.config()
import { QueryTypes } from "sequelize";
import sequelize from "../config/connect_db.js";
import jsreportClient from 'jsreport-client';

class api_forecast_control {
    // Get Data and create PDF
    static getSalesForecast = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT SVoucherDate,DATE_FORMAT(SVoucherDate, '%Y-%m') AS newDate ,SVdetails.SVoucherDetailItemParticulars, COUNT(SVdetails.SVoucherDetailItemParticulars) AS orderByPerson, SVdetails.SVoucherDetailSalePrice,  SVdetails.SVoucherDetailUOMName, SUM(SVdetails.SVoucherDetailQTY) AS SVoucherDetailQTY , SUM(SVdetails.SVoucherDetailTotalAmount) AS SVoucherDetailTotalAmount FROM `SVoucher` JOIN `SVoucherDetail` AS SVdetails ON SVoucherId = SVoucherDetailSVoucherId WHERE SVdetails.SVoucherDetailItemParticulars = 'Bread Shop Bran Rusk' AND SVoucherDate LIKE '2024-%' GROUP BY newDate ORDER BY `SVdetails`.`SVoucherDetailItemParticulars`",
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
                    shortid: "Byx_sKo7Hee",
                    // engine: "jsrender",
                    // recipe: "chrome-pdf" 
                },
                data: {
                    data: result
                }
            }).then((response) => {
                resp.setHeader('Content-Disposition', 'attachment; filename="SalesForecast.xlsx"');
                resp.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
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
    static test_report_SalesForecast = async (req, resp) => {
        try {
            const jsreport = jsreportClient(process.env.PCC_REPORT_SERVER);
            jsreport.render({
                template: {
                    shortid: "Byx_sKo7Hee",
                    // engine: "jsrender",
                    // recipe: "chrome-pdf" 
                },
                data: {
                    "people": [{
                        "name": "Jan Blaha",
                        "age": 31,
                        "gender": "male"
                    }, {
                        "name": "Paule Noic",
                        "age": 24,
                        "gender": "female"
                    }, {
                        "name": "Trent Menzor",
                        "age": 51,
                        "gender": "male"
                    }]
                }
            }).then((response) => {
                resp.setHeader('Content-Disposition', 'attachment; filename="SalesForecast.xlsx"');
                resp.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

                // resp.setHeader("Content-Type", "application/pdf");
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
    static test_data_SalesForecast = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT SVoucherDate,DATE_FORMAT(SVoucherDate, '%Y-%m') AS newDate ,SVdetails.SVoucherDetailItemParticulars, COUNT(SVdetails.SVoucherDetailItemParticulars) AS orderByPerson, SVdetails.SVoucherDetailSalePrice,  SVdetails.SVoucherDetailUOMName, SUM(SVdetails.SVoucherDetailQTY) AS SVoucherDetailQTY , SUM(SVdetails.SVoucherDetailTotalAmount) AS SVoucherDetailTotalAmount FROM `SVoucher` JOIN `SVoucherDetail` AS SVdetails ON SVoucherId = SVoucherDetailSVoucherId WHERE SVdetails.SVoucherDetailItemParticulars = 'Bread Shop Bran Rusk' AND SVoucherDate LIKE '2023-%' GROUP BY newDate ORDER BY `SVdetails`.`SVoucherDetailItemParticulars`",
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

export default api_forecast_control;