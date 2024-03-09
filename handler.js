const mongoose = require("mongoose");

// Define your MongoDB schema and model
const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", NoteSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Helper function to create a response object with CORS headers
const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow requests from any origin
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
};

// Create a new note
module.exports.create = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const newNote = new Note({
      title: data.title,
      content: data.content,
    });
    await newNote.save();
    return createResponse(200, { message: "Note created successfully" });
  } catch (error) {
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Get all notes
module.exports.get = async (event) => {
  try {
    const notes = await Note.find();
    return createResponse(200, notes);
  } catch (error) {
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Update a note by ID
module.exports.update = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
    await Note.findByIdAndUpdate(id, data);
    return createResponse(200, { message: "Note updated successfully" });
  } catch (error) {
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Delete a note by ID
module.exports.delete = async (event) => {
  try {
    const { id } = event.pathParameters;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return createResponse(404, { error: "Note not found" });
    }
    return createResponse(200, { message: "Note deleted successfully" });
  } catch (error) {
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Add a closing curly brace '}' to properly close the auth function
module.exports.auth = async (event) => {
  return {
    principalId: "test",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: "*"
        }
      ]
    }
  };
};
