import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";
import { UserRole } from "../@types/userRole";

const seedAdmin = async () => {
    try {
        const isExists = await prisma.user.count({
            where: {
                role: UserRole.ADMIN
            }
        }) > 0;
        if (isExists) {
            console.log("Admin user already exists");
            return;
        }
        const hash = await bcrypt.hash(env.ADMIN.ADMIN_PASSWORD, 10);
        const adminData = {
            name: env.ADMIN.ADMIN_NAME,
            phone: env.ADMIN.ADMIN_PHONE,
            email: env.ADMIN.ADMIN_EMAIL,
            password: hash,
            role: UserRole.ADMIN,
        };
        await prisma.user.create({
            data: adminData
        });
        console.log("Admin user seeded successfully");
    }
    catch (error) {
        console.error("Error seeding admin user:", error);
    }
};
seedAdmin();