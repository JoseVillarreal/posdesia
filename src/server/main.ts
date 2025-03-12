import { 
    Application,
    Context,
    helpers,
    Router,
} from "https://deno.land/d/oak/mod.ts"

const { getQuery } = helpers;

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

const router = new Router();

// TODO: set up Fresh for html serving

router.get("/", (ctx: Context) => {
    ctx.response.body = "Hello World!";
});

router.get("/poem", (ctx: Context) => {
    ctx.response.body = Array.from(poem.values());
});

router.get("/poem/:id", (ctx: Context) => {
    const { poemId } = getQuery(ctx, { mergeParams: true });
    ctx.response.body = poem.get(poemId);
});

router.get("/poem/:id/:comment", (ctx: Context) => {
    const { poemId, commentId } = helpers.getQuery(ctx, { mergeParams: true });
    ctx.response.body = Object.keys(poem.get(poemId).comments)[commentId];
});

router.get("/poem/:id/:annotation", (ctx: Context) => {
    const { poemId, annotationId } = helpers.getQuery(ctx, { mergeParams: true });
    ctx.response.body = Object.keys(poem.get(poemId).annotations)[annotationId];
});

// Comment Post
router.post("/poem/:id/comment", (ctx: Context) => {
    const { poemId } = helpers.getQuery(ctx, { mergeParams: true });
    const { value } = ctx.request.body({ type: 'json' });

    let poemObj = poem.get(poemId);
    let commentObj = {
        id: poemObj.comments.length + 1,
        name: value.name,
        text: value.text,
    }
    poemObj.comments.put(commentObj);
    // TODO: write new poem comment to DB
    ctx.response.body = poemObj;
});

// Annotation Post
router.post("/poem/:id/annotation", (ctx: Context) => {
    const { poemId } = helpers.getQuery(ctx, { mergeParams: true });
    const { value } = ctx.request.body({ type: 'json' });

    let poemObj = poem.get(poemId);
    let annotationObj = {
        id: poemObj.annotations.length + 1,
        name: value.name,
        text: value.text,
    }
    poemObj.annotations.put(annotationObj);
    // TODO: write new poem annotation to DB
    ctx.response.body = poemObj;
});

// Comment put / comment edit
router.post("/poem/:id/:comment", (ctx: Context) => {
    const { poemId, commentId } = helpers.getQuery(ctx, { mergeParams: true });
    const { value } = ctx.request.body({ type: 'json' });

    let poemObj = poem.get(poemId);
    let commentObj = poemObj.comments.get(commentId);

    commentObj = value;

    // TODO write modified poem comment values to DB
});

router.put("/poem/:id/:annotation", (ctx: Context) => {
    const { poemId, annotationId } = helpers.getQuery(ctx, { mergeParams: true });
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


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
