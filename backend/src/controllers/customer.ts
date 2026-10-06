import mongoose from "mongoose";
import { Request, Response } from "express";
import { Customer } from "../models/customer";
import { tryCatch } from "../utils/tryCatch";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export const getCustomers = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { status, keyword } = req.query;

  const query: any = {};
  if (status && status !== "all") {
    query.status = status;
  }
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword as string, $options: "i" } },
      { email: { $regex: keyword as string, $options: "i" } },
      { location: { $regex: keyword as string, $options: "i" } },
      { customerCode: { $regex: keyword as string, $options: "i" } },
    ];
  }

  const customers = await Customer.find(query).sort({ joined: -1 });
  return ApiResponse(res, "Customers fetched successfully", customers);
});

export const getCustomerById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);
  const customer =
    (await Customer.findOne({ customerCode: id })) ||
    (isMongoId ? await Customer.findById(id) : null);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  return ApiResponse(res, "Customer fetched successfully", customer);
});

export const createCustomer = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { name, email, phone, location, status } = req.body;

  if (!name || !email) {
    throw new ApiError(400, "Name and email are required");
  }

  const existing = await Customer.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Customer with this email already exists");
  }

  const count = await Customer.countDocuments();
  const customerCode = `CUS-${8800 + count + 1}`;

  const customer = await Customer.create({
    customerCode,
    name,
    email,
    phone: phone || "",
    location: location || "United States",
    status: status || "active",
    ordersCount: 0,
    spent: 0,
  });

  return ApiResponse(res, "Customer created successfully", customer, 201);
});

export const updateCustomer = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const patch = req.body;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);

  const customer =
    (await Customer.findOneAndUpdate({ customerCode: id }, patch, { new: true })) ||
    (isMongoId ? await Customer.findByIdAndUpdate(id, patch, { new: true }) : null);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return ApiResponse(res, "Customer updated successfully", customer);
});

export const toggleCustomerStatus = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);

  const customer =
    (await Customer.findOne({ customerCode: id })) ||
    (isMongoId ? await Customer.findById(id) : null);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  customer.status = customer.status === "active" ? "inactive" : "active";
  await customer.save();

  return ApiResponse(
    res,
    `Customer marked as ${customer.status}`,
    customer,
  );
});

export const deleteCustomer = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);

  const deleted =
    (await Customer.findOneAndDelete({ customerCode: id })) ||
    (isMongoId ? await Customer.findByIdAndDelete(id) : null);

  if (!deleted) {
    throw new ApiError(404, "Customer not found");
  }

  return ApiResponse(res, "Customer deleted successfully", deleted);
});
