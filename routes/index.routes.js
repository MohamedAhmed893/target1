import { globalError } from "../middleware/globalError.js";
import { AppError } from "../utils/AppError.js";
import cartRouter from '../routes/cart.js';
import userRouter from "../routes/user.js";
import productRouter from "./api/product.js";
import categoryRouter from "./api/category.js";
import messageRouter from "./api/messaging.js";
import orderRouter from "../routes/Order.js"
export const apiRoutes = (app) => {
  app.use(orderRouter)
  app.use(userRouter)
  app.use(cartRouter);
  app.use("/products", productRouter);
  app.use("/category", categoryRouter);
  app.post("/api/messages", messageRouter);
  app.put("/api/messages/:messageId", messageRouter);
  app.delete("/api/messages/:messageId", messageRouter);
  app.delete("/api/conversations/:conversationId", messageRouter);
  app.get("/api/conversations/:senderId/:receiverId", messageRouter);

  //------------------------------
  app.use("*", (req, res, next) => {
    next(new AppError("Page Not Found " + req.originalUrl, 404));
  });
  app.use(globalError);
};
