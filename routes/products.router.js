const express = require("express")

const router = express.Router()

const productController = require("../controllers/products.controller")
const cacheMiddleware = require("../middleware/cacheMemory.middleware")
const validationMiddleware = require("../middleware/validation.middleware")

router.get(
    "/",
    cacheMiddleware.productCacheMiddleware,
    productController.fetchProducts
)

router.get(
    "/:id",
    cacheMiddleware.productCacheMiddleware,
    productController.fetchProduct
)

router.post(
    "/",
    validationMiddleware.validateProduct,
    cacheMiddleware.productCacheMiddleware,
    productController.createProduct
)

router.put(
    "/:id",
    cacheMiddleware.productCacheMiddleware,
    productController.replaceProduct
)

router.patch(
    "/:id",
    cacheMiddleware.productCacheMiddleware,
    productController.updateProduct
)

router.delete(
    "/:id",
    cacheMiddleware.productCacheMiddleware,
    productController.removeProduct
)

module.exports = router