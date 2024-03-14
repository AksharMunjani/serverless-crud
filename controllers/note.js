const { Note } = require("../db");
const connect = require("../db/connect");
const noteService = require("../services/note");
const { createResponse } = require("../utils/commonFunction");

// Create a new note
module.exports.create = async (event) => {
  try {
    try {
      await connect();
    } catch (error) {
      console.log("Database connection error: ", error);
    }
    const data = JSON.parse(event.body);
    const newNote = new Note({
      title: data.title,
      content: data.content,
    });
    await newNote.save();
    return createResponse(200, { message: "Note created successfully" });
  } catch (error) {
    console.log("🚀 ~ module.exports.create= ~ error:", error);
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Get all notes
module.exports.get = async (event) => {
  try {
        try {
      await connect();
    } catch (error) {
      console.log("Database connection error: ", error);
    }
    const notes = await Note.find();
    return createResponse(200, notes);
  } catch (error) {
    console.log("🚀 ~ module.exports.get= ~ error:", error);
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Update a note by ID
module.exports.update = async (event) => {
  try {
        try {
      await connect();
    } catch (error) {
      console.log("Database connection error: ", error);
    }
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
    await Note.findByIdAndUpdate(id, data);
    return createResponse(200, { message: "Note updated successfully" });
  } catch (error) {
    console.log("🚀 ~ module.exports.update= ~ error:", error);
    return createResponse(500, { error: "Internal Server Error" });
  }
};

// Delete a note by ID
module.exports.delete = async (event) => {
  try {
        try {
      await connect();
    } catch (error) {
      console.log("Database connection error: ", error);
    }
    const { id } = event.pathParameters;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return createResponse(404, { error: "Note not found" });
    }
    return createResponse(200, { message: "Note deleted successfully" });
  } catch (error) {
    console.log("🚀 ~ module.exports.delete ~ error:", error);
    return createResponse(500, { error: "Internal Server Error" });
  }
};
