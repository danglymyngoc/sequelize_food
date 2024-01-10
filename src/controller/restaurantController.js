import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

const conn = initModels(sequelize)

const getListLikeByResId = async (req, res) => {
    try {
        let { res_id } = req.params
        let checkResId = await conn.like_res.findOne({
            where: {
                res_id: res_id,
            }
        })
        if (!checkResId) {
            return res.send('restaurant not found')
        }
        let data = await conn.like_res.findAll({
            where: {
                res_id: res_id
            },
            include: [
                {
                    model: conn.restaurants,
                    as: "re",
                },
                {
                    model: conn.users,
                    as: "user",
                    attributes: {
                        exclude: ["password"],
                    },
                },
            ],
        })
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const getListRateByResId = async (req, res) => {
    try {
        let { res_id } = req.params
        let checkResId = await conn.rate_res.findOne({
            where: {
                res_id: res_id,
            }

        })
        if (!checkResId) {
            return res.send('restaurant not found')
        }
        let data = await conn.rate_res.findAll({
            where: {
                res_id: res_id
            },
            include: [
                {
                    model: conn.restaurants,
                    as: "re",

                },
                {
                    model: conn.users,
                    as: "user",
                    attributes: {
                        exclude: ["password"],
                    },
                },
            ]
        })
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

export {
    getListLikeByResId,
    getListRateByResId
}