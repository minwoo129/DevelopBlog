import dotenv from "dotenv";
export const isActiveInServer = process.env.ACTIVE_ENVIRONMENT == "active";
