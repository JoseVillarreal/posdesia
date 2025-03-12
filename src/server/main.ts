import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { Context } from "@oak/oak/context";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import Poem from "./poems/poems.ts";
import { oakCors } from "@tajpouria/cors";
import Comment from "./comments/comments.ts";

export const app = new Application();
const router = new Router();

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
        id: 1,
        name: "Jose Villarreal",
        text: "Lovely poem, great sentiment",
    }],
    annotations: [],
});

// TODO: set up oak for html serving

router.get("/", (context) => {
    context.response.body = "Hello World!";
});

router.get("/poem", (context) => {
    context.response.body = Array.from(poem.values());
});

router.get("/poem/:id", (context) => {
    if (context.params && context.params.id) {
        const poemObj = Poem.get(context.params.id);
        poemObj.comments.put(Comment.get(context.params.id));
        context.response.body = poemObj;
    }
});


router.get("/poem/:id/:annotation", (context) => {
    context.response.body = Object.keys(poem.get(poemId).annotations)[annotationId];
});

// Comment Post
router.post("/poem/:id/comment", (context) => {
    // const { poemId } = helpers.getQuery(context, { mergeParams: true });
    if (context.params && context.params.id) {
        let poemObj = Poem.get(context.params.id);
        poemObj.comments.put(Comment.get(context.params.id));
        // TODO: write new poem comment to DB
        context.response.body = poemObj;
    }
});

// Annotation Post
router.post("/poem/:id/annotation", (context) => {
    // const { poemId } = helpers.getQuery(context, { mergeParams: true });
    const { value } = context.request.body({ type: 'json' });

    let poemObj = poem.get(poemId);
    let annotationObj = {
        id: poemObj.annotations.length + 1,
        name: value.name,
        text: value.text,
    }
    poemObj.annotations.put(annotationObj);
    // TODO: write new poem annotation to DB
    context.response.body = poemObj;
});

// Comment put / comment edit
router.post("/poem/:id/:comment", (ctx: Context) => {
    // const { poemId, commentId } = helpers.getQuery(ctx, { mergeParams: true });
    const { value } = ctx.request.body({ type: 'json' });

    let poemObj = poem.get(poemId);
    let commentObj = poemObj.comments.get(commentId);

    commentObj = value;

    // TODO write modified poem comment values to DB
});

router.put("/poem/:id/:annotation", (ctx: Context) => {
    // const { poemId, annotationId } = helpers.getQuery(ctx, { mergeParams: true }); 
    const { value } = ctx.request.body({ type: 'json' });

    let poemObj = poem.get(poemId);
    let annotationObj = poemObj.annotations.get(annotationId);

    annotationObj = value;

    // TODO: write modified poem annotation data to DB
});

router.delete("/poem/:id", (ctx: Context) => {
        // TODO: fill in poem deletion logic
});
    
router.delete("/poem/:id/:comment", (ctx: Context) => {
        // TODO: fill in comment deletion logic
});

router.delete("/poem/:id/:annotation", (ctx: Context) => {
        // TODO: fill in annotation deletion logic
});

app.use(router.routes());
app.use(oakCors());
app.use(routeStaticFilesFrom([
    `${Deno.cwd()}/client/dist`,
    `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
    console.log("Server listening on port http://localhost:8000");
    await app.listen({ port: 8000 });
}
