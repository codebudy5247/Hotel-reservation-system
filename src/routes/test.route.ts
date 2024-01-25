import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

/**
 * @openapi
 * /api/healthChecker:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "Server is up and running",
  });
});

export default router;
