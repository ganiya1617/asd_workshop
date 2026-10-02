const database = require("../database/db")

const getProducts = async (query) => {
    let products = await database.delayReadData()

    let { name, minPrice, maxPrice } = query

    minPrice = Number(minPrice)
    maxPrice = Number(maxPrice)

    if (name && name.trim() !== "") {
        products = products.filter((product) =>
            product.name.toLowerCase().includes(name.toLowerCase())
        )
    }

    if (Number.isFinite(minPrice) && minPrice) {
        products = products.filter((product) => product.price >= minPrice)
    }

    if (Number.isFinite(maxPrice) && maxPrice) {
        products = products.filter((product) => product.price <= maxPrice)
    }

    return products
}

const getProductById = async (productId) => {
    const products = await database.delayReadData()

    return products.find((product) => product.id === productId)
}

const createProduct = async (productData) => {
    const products = await database.delayReadData()

    const product = {
        id: products.length + 1,
        name: productData.name,
        price: productData.price
    }

    products.push(product)

    await database.writeIntoFile(products)

    return product
}

const replaceProduct = async (productData) => {
    const products = await database.delayReadData()

    const updatedProducts = products.map((product) => {
        if (product.id === productData.id) {
            return productData
        }

        return product
    })

    await database.writeIntoFile(updatedProducts)

    return productData
}

const updateProduct = async (changes, productId) => {
    const products = await database.delayReadData()

    const updatedProducts = products.map((product) => {
        if (product.id === productId) {
            if (changes.name) {
                product.name = changes.name
            }

            if (changes.price) {
                product.price = changes.price
            }
        }

        return product
    })

    await database.writeIntoFile(updatedProducts)

    return updatedProducts.find((product) => product.id === productId)
}

const removeProduct = async (productId) => {
    const products = await database.delayReadData()

    const deletedProduct = products.find(
        (product) => product.id === productId
    )

    const remainingProducts = products.filter(
        (product) => product.id !== productId
    )

    await database.writeIntoFile(remainingProducts)

    return deletedProduct
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    replaceProduct,
    updateProduct,
    removeProduct
}