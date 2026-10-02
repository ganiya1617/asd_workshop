const validateProduct = (req, res, next) => {

    const productName = req.body.name
    const productPrice = req.body.price

    if (
        productName === undefined ||
        productName.trim() === "" ||
        !Number.isInteger(productPrice)
    ) {
        return res.status(400).send("error")
    }

    next()
}

module.exports = {
    validateProduct
}