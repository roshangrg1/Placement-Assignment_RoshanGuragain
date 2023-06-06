const express = require('express');
const app = express();

// Custom middleware to check if the user is authenticated
const checkAuthMiddleware = (req, res, next) => {
  // Check the user's authentication status
  const isAuthenticated = checkUserAuthentication(req); // Your authentication logic goes here
  
  if (isAuthenticated) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, send an unauthorized response
    res.status(401).send('Unauthorized');
  }
};

// Endpoint: /post
app.get('/post', checkAuthMiddleware, (req, res) => {
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