import { QueryTypes } from "sequelize";
import sequelize from "../config/connect_db.js";
import jsreportClient from 'jsreport-client';


class api_svoucher_control {

    // Get Data and create PDF
    static getSaleDetailByCustomer = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT SVoucherId, SVoucherDate, SVoucherQTYTotal, SVoucherNetAmount, SVoucherCustomerId, SVoucherSourceNo FROM SVoucher WHERE SVoucherCustomerId = :id AND SVoucherVoucherTypeId = 211 AND SVoucherDate BETWEEN :startDate AND :endDate;",
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
            const jsreport = jsreportClient('http://localhost:5488');
            jsreport.render({
                template: {
                    name: "test_tem",
                    engine: "jsrender",
                    recipe: "chrome-pdf"
                },
                options: {
                    preview: true
                },
                data: {
                    data: result
                }
            }).then((response) => {
                resp.setHeader("Content-Type", "application/pdf");
                // resp.setHeader("Content-Disposition", "attachment; filename=report.pdf");
                response.pipe(resp)
                // resp.send("hello")
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            resp.json({
                status: "0",
                message: `test function error ${error}`
            })
        }
    }



    __________________________________________________________________

    // for Developer Use for report check
    static test = async (req, resp) => {
        try {
            const jsreport = jsreportClient('http://localhost:5488');
            jsreport.render({
                template: {
                    name: "test_tem",
                    engine: "jsrender",
                    recipe: "chrome-pdf"
                },
                options: {
                    preview: true
                },
                data: {
                    users: [
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

    // for Developer Use for Query and data check
    static get_data = async (req, resp) => {
        try {
            console.log(req.body)
            const result = await sequelize.query("SELECT SVoucherId, SVoucherDate, SVoucherQTYTotal, SVoucherNetAmount, SVoucherCustomerId, SVoucherSourceNo FROM SVoucher WHERE SVoucherCustomerId = :id AND SVoucherVoucherTypeId = 211 AND SVoucherDate BETWEEN :startDate AND :endDate;",
                {
                    replacements: req.body,
                    type: QueryTypes.SELECT
                }
            )

            resp.json({
                status: "1",
                message: `Successfully get  ${result.length} records`,
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

export default api_svoucher_control;