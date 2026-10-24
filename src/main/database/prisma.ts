import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { app } from "electron";
import path from "path";

const databasePath = path.join(app.getPath("userData"), "warden.db");

const databaseUrl = `file:${databasePath}`;

console.log("[MAIN] Database URL:", databaseUrl);

const adapter = new PrismaLibSql({ url: databaseUrl });

export const prisma = new PrismaClient({ adapter });
