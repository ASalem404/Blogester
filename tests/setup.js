/***
 * When Jest runs, it will only run the files ending with .test.js
 * so many dependencies will not be compiled and that leads to errors.
 * so the setup file will include all these dependencies.
 */

// jest will consider the test failed after 5000 millisecond,
// So the time below in millisecond tell jest what time to take until consider the test as failed
// This time is for each test not all file testes
jest.setTimeout(30000);

require("../models/User");
const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
