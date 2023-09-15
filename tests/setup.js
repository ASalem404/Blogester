/***
 * When Jest runs, it will only run the files ending with .test.js
 * so many dependencies will not be compiled and that leads to errors.
 * so the setup file will include all these dependencies.
 */

require("../models/User");
const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
