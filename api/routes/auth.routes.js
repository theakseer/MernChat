import {Router} from 'express'
import { logIn, logOut, signUp } from '../controllers/authControllers.js'

const router = Router()

router.post('/register', signUp)

router.post('/login', logIn)

router.post('/logout', logOut)

export default router;