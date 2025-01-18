import express from 'express'
import { allUsers, myConversationList, getOneUser, searchUsers } from '../controllers/userController.js';
import protectedRoute from '../middleware/protectedRoute.js';
const router = express.Router()

// router.get('/:id', protectedRoute, singleUser)
router.get('/all', protectedRoute, allUsers)
router.get('/myConversationList', protectedRoute, myConversationList)
router.get('/search/', protectedRoute, searchUsers)
router.get('/:id', protectedRoute, getOneUser)

export default router;