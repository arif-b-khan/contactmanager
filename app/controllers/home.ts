import { Request, Response } from "express";
import path from "path";
/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    const testPath = path.join(process.cwd(), 'build', 'client', 'index.html');
    console.log(testPath);
    res.sendFile(testPath);
};
