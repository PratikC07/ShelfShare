// server/src/modules/products/products.controller.ts
import { type Request, type Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { getAllProducts, getProductById } from "./products.service.js";
import { type GetProductParams } from "./products.types.js";

export const getAllProductsHandler = catchAsync(
  async (req: Request, res: Response) => {
    const products = await getAllProducts();
    res.status(200).json({
      status: "success",
      data: products,
    });
  }
);

export const getProductByIdHandler = catchAsync(
  async (req: Request<GetProductParams>, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).json({
      status: "success",
      data: product,
    });
  }
);
