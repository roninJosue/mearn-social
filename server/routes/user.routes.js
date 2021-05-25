import express from "express"
import usrController from "./../controllers/user.controller"
import authController from './../controllers/auth.controller'

const router = express.Router()

router.route("/api/users")
    .get(usrController.list)
    .post(usrController.create)
    
router.route('/api/users/photo/:userId')
    .get(usrController.photo, usrController.defaultPhoto)
router.route('/api/users/defaultPhoto')
    .get(usrController.defaultPhoto)

/*router.route('/api/users/follow')
    .put(authController.requireSignin, 
        usrController.addFollowing, 
        usrController.addFollower)*/

router.route('/api/users/follow')
    .put(authController.requireSignin, 
        usrController.addFollowing, 
        usrController.addFollower)
        
router.route('/api/users/unfollow')
    .put(authController.requireSignin, 
        usrController.removeFollowing,
        usrController.removeFollower)

router.route('/api/users/:userId')
    .get(authController.requireSignin, usrController.read)
    .put(authController.requireSignin, 
            authController.hasAuthorization, 
            usrController.update)
    .delete(authController.requireSignin,
            authController.hasAuthorization,
            usrController.remove)

router.param('userId', usrController.userById)

export default router