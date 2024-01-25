import { Router } from 'express'
import { body, oneOf } from 'express-validator'
import { handleInputErrors } from './modules/middlewares'
import { createProduct, deleteProduct, getOneproduct, getProducts, updateProduct } from './handlers/product'

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

router.post('/product', body('name').isString(), handleInputErrors, createProduct)

router.delete('/product:id', deleteProduct)

/**
 * Update
 */
router.get('/update', () => {})

router.get('/update:id', () => {
})

router.put(
    '/update:id',
    body('title').optional(),
    body('body').optional(),
    oneOf([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]),
    body('version').optional,
    handleInputErrors,
    () => {}
)

router.post(
    '/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('status').isIn([
        'IN_PROGRESS',
        'SHIPPED',
        'DEPRECATED'
    ]),
    body('version').optional,
    handleInputErrors,
    () => {}
)

router.delete('/update:id', () => {})

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

export default router
