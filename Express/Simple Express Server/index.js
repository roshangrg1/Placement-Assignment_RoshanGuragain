const express = require('express');
const app = express();

// Endpoint: /post
app.get('/post', (req, res) => {
  // Generate 20 example posts
  const posts = [];
  for (let i = 1; i <= 20; i++) {
    posts.push({ id: i, title: `Post ${i}`, body: `This is the body of Post ${i}` });
  }
  
  // Send the posts as a response
  res.json(posts);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});