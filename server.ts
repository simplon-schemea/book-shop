import Express from "express";
import Path from "path";
import Request from "request";
import Morgan from "morgan";
import Keyv from "keyv";

const app = Express();
const port = process.env.PORT || 80;
// const cache = new Keyv(Path.join("sqlite://", __dirname, "database.sqlite"), { namespace: "cache" });

function getURLComponent(req: Express.Request) {
  const query = Object.entries(req.query).map(([k, v]: [string, string]) => k + "=" + encodeURIComponent(v)).join("&");

  let url = req.path.substr(1);
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  if (query) {
    url += "?" + query;
  }
  return url;
}

app.use(Morgan("dev"));
app.use("/proxy", async (req, res, next) => {
  try {
    const url = getURLComponent(req);
    const stream = Request(url);
    stream.pipe(res);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.end(e.toString());
  }
});
// app.use("/cache", async (req, res, next) => {
//   try {
//     const url = getURLComponent(req);
//     const data = await cache.get(url);
//     if (data) {
//       res.end(data);
//     } else {
//       const stream = Request(url);
//       stream.pipe(res);
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500);
//     res.end(e.toString());
//   }
// });
app.get("/stats.json", (req, res, next) => {
  res.status(403);
  res.end();
});
app.get("/index.html", (req, res, next) => {
  req.url = "/";
  console.log("redirecting", req.url, "to /");
  next();
});
app.use(Express.static(Path.join(__dirname, "dist/book-shop"), { index: false }));
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  const base = Path.join(__dirname, "dist/book-shop");
  const liveServer = require("livereload").createServer();
  app.use("/", (req, res, next) => {
    const fs: typeof import("fs") = require("fs");
    const html = fs.readFileSync(Path.join(base, "index.html"));
    const headEnd = html.indexOf("</head>");
    res.write(html.subarray(0, headEnd));
    res.write("<script src=\"http://localhost:35729/livereload.js?snipver=1\" async></script>");
    res.end(html.subarray(headEnd, html.length));
  });
  liveServer.watch(base);
} else {
  app.use("/", (req, res, next) => {
    res.sendFile(Path.join(__dirname, "dist/book-shop/index.html"));
  });
}


const listener = app.listen(port, () => {
  console.log("Server is listening on port:", listener.address().port);
});
