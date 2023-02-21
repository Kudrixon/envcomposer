const app = require("./server");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});
