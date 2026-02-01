import express from 'express'
import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from './modules/medicine/medicine.router';
import { categoriesRouter } from './modules/categories/categories.router';
import { auth } from './lib/auth';
import { reviewsRouter } from './modules/reviews/reviews.router';
import { userRouter } from './modules/user/user.router';
import { ordersRouter } from './modules/orders/orders.router';
import errorHandler from './middileware/errorHandler';
import { notFound } from './middileware/notFound';

const app = express();


app.use(express.json());
app.use(
    cors({
        origin: [
            process.env.FRONTEND_APP_URL!,
            "http://localhost:3000",
            "http://localhost:4000",
            "http://localhost:5000",
        ],
        credentials: true,
    })
);

app.all("/api/auth/*splat", toNodeHandler(auth));




app.use("/api/medicines", medicineRouter)
app.use("/api/categories", categoriesRouter)
app.use("/api/reviews", reviewsRouter)
app.use("/api/users/me", userRouter)
app.use("/api/orders", ordersRouter)




app.get('/', (req, res) => {
    res.send('Welcome to MediStore');
})

app.use(errorHandler)
app.use(notFound)

export default app;