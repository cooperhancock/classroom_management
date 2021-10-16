import Koa from "koa";
import Router from "@koa/router";
import json from "koa-json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Koa();

app.use(json({ pretty: false }));

// routers

const router = new Router();

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

router.get("/buildings", async (ctx, next) => {
    ctx.body = await prisma.building.findMany();
});

app.use(router.routes()).use(router.allowedMethods());

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
