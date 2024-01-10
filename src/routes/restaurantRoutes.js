import express from 'express';
import { getListLikeByResId, getListRateByResId } from '../controller/restaurantController.js';


const restaurantRoutes = express.Router()

restaurantRoutes.get('/get-list-like-by-resId/:res_id', getListLikeByResId)
restaurantRoutes.get('/get-list-rate-by-resId/:res_id', getListRateByResId)


export default restaurantRoutes