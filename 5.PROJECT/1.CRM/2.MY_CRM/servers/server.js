const express = require("express");
const morgan = require("morgan");
const path = require("path");
const usersRouter = require("./routes/server_users.js");
const PORT = 3000;

const app = express();

app.use(morgan("dev"));
//이 경로를 기준으로 js 파일을 찾아 서빙할 수 있다
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`Sever is ready at ${PORT}`);
});
