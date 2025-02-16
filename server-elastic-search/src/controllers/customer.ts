import { NextFunction, Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler"
import {
  createCustomer,
  deleteCustomerById,
  findCustomerById,
  findCustomersByAgent,
  getAllCustomers,
  updateCustomer,
} from "../services"
import { ICustomer } from "../interfaces"
import CustomError from "../utils/customError"

export const getAllCustomerDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllCustomers()
    res.status(200).json({
      success: true,
      message: "All customers fetched successfully",
      customers: result.hits.hits.map((customer) => ({
        ...customer._source!,
        _id: customer._id,
      })),
    })
  }
)

export const addCustomer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { payment_status, authUser } = req.body
    const customer = {
      ...req.body,
      authUser: undefined,
      payment_status: payment_status || "PENDING",
      agent: {
        _id: authUser._id,
        name: authUser.name,
      },
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await createCustomer(customer)

    //Notify admin

    res.status(201).json({
      success: true,
      message: "Customer added successfully",
    })
  }
)

export const updateCustomerDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { authUser } = req.body
    const customer = req.body as ICustomer

    const getCustomer = await findCustomerById(id)
    if (getCustomer.hits.hits.length === 0) {
      const err = new CustomError("Customer not found", 404)
      next(err)
      return
    }

    if (
      authUser.role !== "ADMIN" &&
      authUser._id !== (getCustomer.hits.hits[0]._source as ICustomer).agent._id
    ) {
      const err = new CustomError(
        "You are not authorized to update this customer",
        400
      )
      next(err)
    }

    const updatedCustomer = {
      ...(getCustomer.hits.hits[0]._source as ICustomer),
      ...customer,
      updatedAt: new Date().toISOString(),
    }

    await updateCustomer(updatedCustomer, id)

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
    })
  }
)

export const getCustomerDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const getCustomer = await findCustomerById(id)
    if (getCustomer.hits.hits.length === 0) {
      const err = new CustomError("Customer not found", 404)
      next(err)
      return
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: {
        ...(getCustomer.hits.hits[0]._source as ICustomer),
        _id: getCustomer.hits.hits[0]._id,
      },
    })
  }
)

export const deleteCustomer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { authUser } = req.body

    const getCustomer = await findCustomerById(id)
    if (getCustomer.hits.hits.length === 0) {
      const err = new CustomError("Customer not found", 404)
      next(err)
      return
    }

    if (
      authUser.role !== "ADMIN" &&
      authUser._id !== (getCustomer.hits.hits[0]._source as ICustomer).agent._id
    ) {
      const err = new CustomError(
        "You are not authorized to delete this customer",
        400
      )
      next(err)
    }

    await deleteCustomerById(id)

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    })
  }
)

export const getAllCustomerByAgent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authUser } = req.body
    const result = await findCustomersByAgent(authUser._id)
    res.status(200).json({
      success: true,
      message: "All customers fetched successfully",
      customers: result.hits.hits.map((customer) => ({
        ...customer._source!,
        _id: customer._id,
      })),
    })
  }
)
