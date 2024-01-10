import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

const conn = initModels(sequelize)
const like = async (req, res) => {
    try {
        let { user_id, res_id, date_like } = req.body
        let checkUserId = await conn.like_res.findOne({
            where: {
                user_id: user_id,
            }
        })
        let checkResId = await conn.like_res.findOne({
            where: {
                res_id: res_id,
            }
        })

        if (!checkUserId) {
            return res.send('User not found')
        }
        if (!checkResId) {
            return res.send('Restaurant not found')
        }

        await conn.like_res.create({
            user_id,
            res_id,
            date_like
        })
        res.send('like successful')
    } catch (error) {
        res.send(error)
    }
}

const unlike = async (req, res) => {
    let { like_res_id } = req.body
    await conn.like_res.destroy({
        where: {
            like_res_id: like_res_id
        }
    })

    res.send('unlike successful')
}

const getListLikeByUserId = async (req, res) => {
    try {
        let { user_id } = req.params
        let checkUserId = await conn.like_res.findOne({
            where: {
                user_id: user_id,
            }
        })
        if (!checkUserId) {
            return res.send('user not found')
        }
        let data = await conn.like_res.findAll({
            where: {
                user_id: user_id
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

const getListRateByUserId = async (req, res) => {
    try {
        let { user_id } = req.params
        let checkUserId = await conn.rate_res.findOne({
            where: {
                user_id: user_id,
            }
        })
        if (!checkUserId) {
            return res.send('user not found')
        }
        let data = await conn.rate_res.findAll({
            where: {
                user_id: user_id
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

const order = async (req, res) => {
    try {
        let { user_id, food_id, amount, code, arr_sub_id } = req.body
        let checkUserId = await conn.users.findOne({
            where: {
                user_id: user_id
            }
        })
        let checkFoodId = await conn.foods.findOne({
            where: {
                food_id: food_id
            }
        })
        if (!checkUserId) {
            return res.send('user not found')
        }
        if (!checkFoodId) {
            return res.send('food not found')
        }
        let data = {
            user_id,
            food_id,
            amount,
            code,
            arr_sub_id
        }
        await conn.orders.create(data)
        res.send('order successful')
    } catch (error) {
        res.send(error)
    }
}

const createRate = async (req, res) => {
    try {
        let { user_id, res_id, amount, date_rate } = req.body
        let checkUserId = await conn.users.findOne({
            where: {
                user_id: user_id
            }
        })
        let checkResId = await conn.restaurants.findOne({
            where: {
                res_id: res_id
            }
        })
        if (!checkUserId) {
            return res.send('user not found')
        }
        if (!checkResId) {
            return res.send('restaurant not found')
        }
        let data = {
            user_id,
            res_id,
            amount,
            date_rate
        }
        await conn.rate_res.create(data)
        res.send('create rate successful')
    } catch (error) {
        res.send(error)
    }

}

export {
    like,
    unlike,
    getListLikeByUserId,
    getListRateByUserId,
    order,
    createRate
}