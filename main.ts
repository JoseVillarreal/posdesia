import { Application, Router } from "https://deno.land/d/oak/mod.ts"

const poem = new Map<string, any>();
poem.set("1", {
    id: "1",
    title: "Dreams",
    author: "Langston Hughes",
    poem: `Hold fast to dreams
For if dreams die
Life is a broken-winged bird
That cannot fly.
Hold fast to dreams
For when dreams go
Life is a barren field
Frozen with snow.`,
    comments: [{
        id: 1
        name: "Jose Villarreal",
        text: "Lovely poem, great sentiment",
    }];
    annotations: [],
});

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello World!";
    })
    .get("/poem", (context) => {
        context.response.body = Array.from(poem.values());
    })
    .get("/poem/:id", (context) => {
        if (books.has(context?.params?.id)) {
        context.response.body = poem.get(context.params.id);
    })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
