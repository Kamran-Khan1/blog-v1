import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
const app = express();
env.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // It's very much inmportant to use this here
//We are gettitng All the data
app.get("/api", (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Internal server error:${error} `,
    });
  }
});

// Gettimg data by specific ID
app.get("/api/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const findData = data.find((item) => item.id === userId);
    if (findData) {
      res.status(200).json(findData);
    } else {
      res.status(400).json({
        message: `The Id is not correct`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error ${error}`,
      problem: `Please give all the info correctly`,
    });
  }
});

// Posting data
app.post("/api/post", (req, res) => {
  try {
    const { title, blog, author } = req.body;
    const newObj = {
      id: data.length + 1,
      title: title,
      blog: blog,
      author: author,
    };
    data.push(newObj);
    res.status(200).json(newObj);
  } catch (error) {
    res.status(500).json({
      message: `Internal server error ${error}`,
      problem: `Problem posting data`,
    });
  }
});

//Updating data
app.put("/api/update/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { title, blog, author } = req.body;

    const findOldData = data.find((item) => item.id === userId);

    const newData = {
      id: userId,
      title: title || findOldData.title,
      blog: blog || findOldData.blog,
      author: author || findOldData.author,
    };

    const findOldIndex = data.findIndex((item) => item.id === userId);

    data[findOldIndex] = newData;

    res.status(200).json({
      message: "Data updated succesfully",
      updatedData: newData,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error ${error}`,
      problem: `Please give id number correctly`,
    });
  }
});

//Deleting data
app.delete("/api/delete/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id); // You have to convert this to number

    const matchIndex = data.findIndex((item) => item.id === userId);
    //   console.log(matchIndex); // We are successfully parsed the index
    if (matchIndex >= 0) {
      data.splice(matchIndex, 1);
      res.status(200).json({
        message: "data deleted successfully",
      });
    } else {
      res.status(400).json({
        message: `given id is not correct`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal server error ${error}`,
      problem: `Error deliting data`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Api is running at PORT: ${PORT}`);
});

const data = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    blog: "JavaScript is a versatile programming language used for web development, known for its ability to add interactivity to websites.",
    author: "Kamran Khan",
  },
  {
    id: 2,
    title: "Understanding HTML and CSS",
    blog: "HTML and CSS are the building blocks of the web. HTML structures the content, while CSS styles it to create visually appealing web pages.",
    author: "Jaber Khan",
  },
  {
    id: 3,
    title: "Mastering React.js",
    blog: "React.js is a popular JavaScript library for building user interfaces, particularly single-page applications, with a focus on components and state management.",
    author: "Munshi",
  },
  {
    id: 4,
    title: "The Power of Node.js",
    blog: "Node.js allows developers to use JavaScript on the server side, enabling full-stack development with a single programming language.",
    author: "Abdullah Khan",
  },
  {
    id: 5,
    title: "Exploring Express.js",
    blog: "Express.js is a minimal and flexible Node.js framework that provides a robust set of features for building web and mobile applications.",
    author: "Shiku",
  },
];
