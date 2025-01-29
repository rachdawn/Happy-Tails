const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

 app.get('/', (req, res) => {
   res.send('Hello from test server!');
 });

 app.listen(PORT, () => {
   console.log(`Test server listening on port ${PORT}`);
 });
