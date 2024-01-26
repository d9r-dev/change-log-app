import { NextFunction, Response, Router } from 'express'
import { body, oneOf } from 'express-validator'
import { handleInputErrors } from './modules/middlewares.js'
import {
    createProduct,
    deleteProduct,
    getOneproduct,
    getProducts,
    updateProduct,
} from './handlers/product.js'
import {
    createUpdate,
    deleteUpdate,
    getOneUpdate,
    getUpdates,
    updateUpdate,
} from './handlers/update.js'
import { ICustomError, ICustomRequest } from './types/interfaces.js'

const router = Router()

/**
 * Product
 */
router.get('/product', getProducts)

router.get('/product:id', getOneproduct)

router.put(
    '/product:id',
    body('name').isString(),
    handleInputErrors,
    updateProduct
)

router.post(
    '/product',
    body('name').isString(),
    handleInputErrors,
    createProduct
)

router.delete('/product:id', deleteProduct)

/**
 * Update
 */
router.get('/update', getUpdates)

router.get('/update:id', getOneUpdate)

router.put(
    '/update:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    handleInputErrors,
    updateUpdate
)

router.post(
    '/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors,
    createUpdate
)

router.delete('/update:id', deleteUpdate)

/**
 * Update Point
 */
router.get('/updatepoint', () => {})

router.get('/updatepoint:id', () => {})

router.put(
    '/updatepoint:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors,
    () => {}
)

router.post(
    '/updatepoint',
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('updateId').exists().isString(),
    handleInputErrors,
    () => {}
)

router.delete('/updatepoint:id', () => {})

router.use((err: ICustomError, req: ICustomRequest, res: Response, next: NextFunction) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'unauthorized'})
    } else if (err.type === 'input') {
        res.status(400).json({message: "invalid input"})
    } else {
        res.status(500).json({message: "oops thats on us"})
    }
})

export default router
