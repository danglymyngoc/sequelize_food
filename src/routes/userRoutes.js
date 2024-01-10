import express from 'express';
import { createRate, getListLikeByUserId, getListRateByUserId, like, order, unlike } from '../controller/userController.js';


const userRoutes = express.Router()

userRoutes.post('/like', like)
userRoutes.delete('/unlike', unlike)
userRoutes.get('/get-list-like-by-userId/:user_id', getListLikeByUserId)
userRoutes.get('/get-list-rate-by-userId/:user_id', getListRateByUserId)
userRoutes.post('/order', order)
userRoutes.post('/create-rate', createRate)


export default userRoutes