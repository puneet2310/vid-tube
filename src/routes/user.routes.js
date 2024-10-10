
import { Router } from "express"
import { 
        registerUser,
        loginUser,
        logoutUser,
        changeCurrentPassword,
        updateAccountDetails,
        updateUserAvatar,
        updateUsercoverImage,
        refreshAccessToken,
        getCurrentUser,
        getUserChannelProfile,
        getWatchHistory
        } 
        from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()
// unsecured routes --> accessed by all users , not worry about for verifyJWT middleware

router.route("/register").post( upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, {
        name: "coverImage",
        maxCount: 1
    }
]) , registerUser)

router.route("/login").post( loginUser)
router.route("/refresh-token").post(refreshAccessToken)


//secured routes

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/update-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account-details").patch(verifyJWT, updateAccountDetails)

router.route("/update-avatar").patch(verifyJWT , upload.single("avatar"), updateUserAvatar)
router.route("/update-coverImage").patch(verifyJWT , upload.single("coverImage"), updateUsercoverImage)

router.route("/c/:userName").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router