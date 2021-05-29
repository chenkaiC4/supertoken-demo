const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");


supertokens.init({
    supertokens: {
        connectionURI: 'https://try.supertokens.io',
      },
    appInfo: {
        appName: 'test',
        websiteDomain:`http://localhost:3000`,
        apiDomain: `http://localhost:3001`,
    },
    recipeList: [
        EmailPassword.init(),
        Session.init({
            errorHandlers: {
                onUnauthorised: (message, reqest, response, next) => {
                    console.log(message)
                },
            }
        })
    ]
});

const app = express();


app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

app.use(morgan("dev"));
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(supertokens.middleware());

// custom API that requires session verification
app.get("/sessioninfo", Session.verifySession({sessionRequired: false}), async (req, res) => {
    console.log("in")
    console.log(req);
    let session = req.session;

    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData(),
    });
});


app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
})

app.listen(3001, () => console.log(`API Server listening on port ${3001}`));