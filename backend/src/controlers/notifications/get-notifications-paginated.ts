import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import notificationModel from "../../models/notifications.model";

type QueryParams = {
    page: string | number;
    size: string | number;
    title: string;
};

const getNotificationsPaginated: RequestHandler = async (
    req: Request,
    res: Response
) => {
    let {page, size, title} = req.query as QueryParams;
    page = page === "" || !page ? "1" : page;
    size = page === "" || !size ? "10" : size;

    const userId: string = (req.user as any)._id;

    if (isNaN(+page) || isNaN(+size)) {
        res.status(400).json({message: "Invalid page or size info"});
        return;
    }

    page = Number(page);
    size = Number(size);

    try {
        const notifications = await notificationModel.aggregate([
            {
                $match: { recipientId: new mongoose.Types.ObjectId(userId)  }
            },
            {
                $lookup:
                    {
                        from: "users",
                        localField: "recipientId",
                        foreignField: "_id",
                        as: "user"
                    }
            },
            {
                $match:
                    {
                        title: {
                            $regex: title,
                            $options: "i"
                        }
                    }
            },
            {
                $sort:
                    {
                        _id: 1
                    }
            },
            {
                $skip: (page - 1) * size
            },
            {
                $limit: size
            }
        ]);

        const notificationsCount: any = await notificationModel.aggregate([
            {
                $lookup:
                    {
                        from: "users",
                        localField: "recipientId",
                        foreignField: "_id",
                        as: "user"
                    }
            },
            {
                $count: "count"
            }
        ]);

        const notificationCountValue = notificationsCount[0]?.count ?? 0;
        const remaining = notificationCountValue % size;
        const remainingPage: number = remaining > 0 ? 1 : 0;
        const pageCount: number = Math.trunc(notificationCountValue / size + remainingPage);
        const notificationsDto = notifications.map(n => ({
            title: n.title ?? "",
            message: n.message ?? "",
            recipientId: n.recipientId,
            recipientName: n.user[0]?.fullName ?? "",
            createdAt: n.createdAt ?? new Date()
        }));

        res.status(200).json({notifications: notificationsDto, pageCount});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

export default getNotificationsPaginated;
