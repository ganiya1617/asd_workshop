const database = require("../database/db")

const cacheStore = {}

const productCacheMiddleware = async (req, res, next) => {
    const requestUrl = req.originalUrl
    const saved = cacheStore[requestUrl]

    if (req.method !== "GET") {
        Object.keys(cacheStore).forEach((key) => {
            if (cacheStore[key] && key.startsWith("/products")) {
                delete cacheStore[key]
            }
        })

        next()
        return
    }

    if (saved && Date.now() <= saved.expiresAt) {
        res.set("cache", "HIT")
        return res.json(saved.data)
    }

    if (saved && Date.now() > saved.expiresAt) {
        delete cacheStore[requestUrl]
    }

    res.set("cache", "MISS")

    const sendResponse = res.json.bind(res)

    res.json = (data) => {
        cacheStore[requestUrl] = {
            data: data,
            expiresAt: Date.now() + (60 * 1000)
        }

        return sendResponse(data)
    }

    next()
}

module.exports = {
    productCacheMiddleware
}