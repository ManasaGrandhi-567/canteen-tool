const bcrypt = require('bcrypt');
bcrypt.hash('admin1', 10, (err, hash) => console.log(hash));