const require = require('express');
const app = express();

const PORT = process.env.PORT || 3000;   // if there's a port number specified 
// in the environment variables, use that. If not specified, use port 3000.
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
