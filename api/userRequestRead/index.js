const { userRequestModel } = require("../models/index")
const axios = require("axios")
const HOST = process.env["HOST"]

module.exports = async function (context, req) {
    const admin_token = req.headers["admin_token"]
    const user_token = req.headers["token"]
    if (!admin_token && !user_token) {
        context.res = {
            statusCode: 400,
            body: "Bad Request"
        }
        context.done()
        return
    }
    let filter
    if (admin_token) {
        let res
        try {
            res = await axios.get(`${HOST}/api/authValidationAdmin`,{
                headers: {
                    token: admin_token
                }
            })
        } catch (err) {
            context.res = {
                statusCode: err.toJSON().status,
                body: err.message
            }
            context.done()
            return
        }
        filter = {}
    }
    if (user_token) {
        let res
        try {
            res = await axios.get(`${HOST}/api/googleAuthValidation`,{
                headers: {
                    token: user_token
                }
            })
        } catch (err) {
            context.res = {
                statusCode: 401,
                body: err.message
            }
            context.done()
            return
        }
        const username = res.data
        filter = { username: username }
    }

    try {
        const requests = await userRequestModel.find(filter)
        context.res = {
            statusCode: 200,
            body: requests
        }
    } catch (err) {
        context.res = {
            statusCode: 500,
            body: err.message
        }
    }
    context.done()
}