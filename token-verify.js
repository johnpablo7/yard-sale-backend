const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NDY4MzU5MX0.EZbbYQX7MB9KYWPffjdYdvpJJC8ZqdTwtbjD9I3-zgA';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
