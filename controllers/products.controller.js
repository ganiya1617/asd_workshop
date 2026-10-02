const productService = require("../services/products.service")

const fetchProducts = async (req, res) => {
    const data = await productService.getProducts(req.query)
    res.json(data)
}

const fetchProduct = async (req, res) => {
    const productId = Number(req.params.id)

    const data = await productService.getProductById(productId)

    res.json(data)
}

const createProduct = async (req, res) => {
    const data = await productService.createProduct(req.body)

    res.status(201).json(data)
}

const replaceProduct = async (req, res) => {
    const productId = Number(req.params.id)
    const productPrice = Number(req.body.price)
    const productName = req.body.name

    const data = await productService.replaceProduct({
        id: productId,
        name: productName,
        price: productPrice
    })

    res.status(200).json(data)
}

const updateProduct = async (req, res) => {
    const productId = Number(req.params.id)

    const data = await productService.updateProduct(
        req.body,
        productId
    )

    res.status(200).json(data)
}

const removeProduct = async (req, res) => {
    const productId = Number(req.params.id)

    const data = await productService.removeProduct(productId)

    res.status(200).json(data)
}

module.exports = {
    fetchProducts,
    fetchProduct,
    createProduct,
    replaceProduct,
    updateProduct,
    removeProduct
}