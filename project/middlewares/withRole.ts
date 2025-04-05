// middleware/withRole.ts
import { auth, db } from "@/utils/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export const withRole = (allowedRoles: string[], handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) return res.status(401).json({ error: "No token" });

      const decoded = await auth.verifyIdToken(token);
      const roleSnap = await db.collection("roles").doc(decoded.uid).get();
      const role = roleSnap.data()?.role;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      return handler(req, res, decoded);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};
