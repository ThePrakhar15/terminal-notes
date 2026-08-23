import express from 'express';
import authRouter from './routes/authRouter.js'

const app = expree();
app.use(express.json());
app.use("api/auth",authRouter);

export default app;