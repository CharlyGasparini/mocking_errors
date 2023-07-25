import dotenv from "dotenv";

dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}