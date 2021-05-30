import express from 'express'
import authController from './../controllers/auth.controller'
import postController from './../controllers/post.controller'
import userController from './../controllers/user.controller'

const router = express.Router()

router.report('/api/posts/feed/:userId')
    .get(authController.requireSignin, 
        postController.listNewsFeed)
router.param('userId', userController.userById)