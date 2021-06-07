import express from 'express'
import authController from './../controllers/auth.controller'
import postController from './../controllers/post.controller'
import userController from './../controllers/user.controller'

const router = express.Router()

router.route('/api/posts/feed/:userId')
    .get(authController.requireSignin, 
        postController.listNewsFeed)
router.route('/api/post/by/:userId')
    .get(authController.requireSignin, postController.listByUser)

router.param('userId', userController.userById)

export default router