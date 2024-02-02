import express from 'express'
import { getAllUser , getSingleUser , updateUser , deleteUser } from '../Controllers/users.js'

const router = express.Router()


router.get('/' , getAllUser)
router.get('/:id', getSingleUser)
router.put('/:id' , updateUser)
router.delete('/:id' , deleteUser)