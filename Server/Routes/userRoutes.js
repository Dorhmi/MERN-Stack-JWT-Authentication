import express from 'express'
import { getAllUser , getSingleUser , updateUser , deleteUser } from '../Controllers/users.js'
import {verifyToken} from '../Middleware/Verify.js'

const router = express.Router()

router.use(verifyToken);

router.get('/' , getAllUser)
router.get('/:id', getSingleUser)
router.put('/:id' , updateUser)
router.delete('/:id' , deleteUser)

export default router