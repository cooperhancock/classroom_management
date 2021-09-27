import Koa from "koa";
import json from "koa-json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Koa();

app.use(json({ pretty: false }));

// logger

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
});

// response

app.use(async (ctx) => {
    ctx.body = await prisma.building.findMany();
});

const main = () => {
    const PORT = parseInt(process.env.PORT ?? "3001");
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
};

try {
    main();
} finally {
    prisma.$disconnect();
}
