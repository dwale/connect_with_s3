const express = require("express");
const routes = require("./routes/routes");

require("dotenv").config();

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
	console.log("Listening to port 3000");
});

//middle ware for basic routes
app.use("/manage-assets", routes);

//Middleware to handle applications with wrong route
app.use((req, res, next) => {
	const error = new Error("This path doesn't exist");
	error.status = 404;
	next(error);
});

//Middleware to handle all errors
app.use((error, req, res, next) => {
	res.status(error.status || 500).send({
		error: {
			status: error.status || 500,
			message: error.message || "Internal Server Error",
		},
	});
});
