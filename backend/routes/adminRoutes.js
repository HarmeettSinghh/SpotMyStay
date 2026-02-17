import express from "express";
import {getPendingOwners,approveOwner} from '../controllers/adminController.js'
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

//veiw all pending requests

router.get("/pending-owners", protect, authorizeRoles("admin"),getPendingOwners);

//Approve an Owner
router.put("/approve-owner/:id",protect,authorizeRoles("admin"),approveOwner);

export default router;