const express = require("express");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
// const ctrl = require('../../controllers/books')

// const {validateBody} = require("../../middlewares");
const contacts = require("../../db/contacts");
// const schemas = require("../../schemas/book")

// const {ctrlWrapper} = require("../../helpers")

// const messages = {
//   400: "Bad Request",
//   401: "Unauthorized",
//   403: "Forbbiden",
//   404: "Not found",
//   409: "Conflict",
// };

// const RequestError = (status, message = messages[status]) => {
//   const error = new Error(messages);
//   error.status = status;
//   return error;
// };

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     message: "Missing required name field",
    //   });
    // }
    const result = await contacts.addContact(id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     message: "Missing fields",
    //   });
    // }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
