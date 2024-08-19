import { Router } from "express";
import authRoutes from "./auth.routes";
import dataRoutes from "./data.routes";
import userRoutes from "./user.routes";
import apiRoutes from "./api.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/data", dataRoutes);
router.use("/user", userRoutes);
router.use("/api", apiRoutes);
<<<<<<< HEAD
=======

if (process.env.NODE_ENV === "production") {
  router.use(express.static(join(__dirname, "../frontend/build")));

  router.get("*", (_req: Request, res: Response) => {
    res.sendFile(join(__dirname, "../frontend/build", "index.html"));
  });
}
>>>>>>> 8ac134ca4cc40d5dcb80ee96fb7df9a270a41206

export default router;
