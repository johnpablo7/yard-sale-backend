const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin12345';
  const hash = '$2b$10$hC1p/FWN2KDSkyMWGH/KFOb7leO7gw22htJbvTjTM1q.nbLb9cOGa';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
