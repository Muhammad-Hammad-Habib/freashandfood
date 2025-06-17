import { QueryTypes } from "sequelize";
import sequelize from "../config/connect_db.js";
class api_svoucher_control {
    static getSaleDetailByCustomer = async (req, resp) => {
        try {
            const result = await sequelize.query("SELECT SVoucherId, SVoucherDate, SVoucherQTYTotal, SVoucherNetAmount, SVoucherCustomerId, SVoucherBillTotal FROM `SVoucher` WHERE SVoucherCustomerId = :id AND SVoucherVoucherTypeId = 211 AND SVoucherDate BETWEEN :startDate AND :endDate;",
                {
                    replacements : req.body,
                    type: QueryTypes.SELECT
                }
            )  
            console.log(result.length)
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