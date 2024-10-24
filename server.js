import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const PORT = 4000;
const URL = "http://localhost:3000";
//Using middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // It's very much inmportant to use this here also

//routes
app.get("/", async (req, res) => {
  const response = await axios.get(`${URL}/api`);
  // console.log(response.data);
  res.render("home.ejs", { posts: response.data });
});

//getting the new post page
app.get("/new", (req, res) => {
  res.render("edit.ejs");
});

//posting a new data
app.post("/post", async (req, res) => {
  try {
    const response = await axios.post(`${URL}/api/post`, req.body);
    console.log(response.data);
    console.log(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
});

//getting a post by its ID to update further

app.get("/edit/:id", async (req, res) => {
  const response = await axios.get(`${URL}/api/${req.params.id}`);
  // console.log(response.data);
  res.render("edit.ejs", { previousPost: response.data });
});

//update a post
app.post("/post/update/:id", async (req, res) => {
  const response = await axios.put(
    `${URL}/api/update/${req.params.id}`,
    req.body
  );
  console.log(response.data);
  res.redirect("/");
});

//deleting a post
app.get("/delete/:id", async (req, res) => {
  await axios.delete(`${URL}/api/delete/${req.params.id}`);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`App is running at PORT: ${PORT}`);
});
