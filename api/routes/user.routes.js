import express from 'express'
import { allUsers, myConversationList } from '../controllers/userController.js';
import protectedRoute from '../middleware/protectedRoute.js';
const router = express.Router()

// router.get('/:id', protectedRoute, singleUser)
router.get('/all', protectedRoute, allUsers)
router.get('/myConversationList', protectedRoute, myConversationList)

export default router;