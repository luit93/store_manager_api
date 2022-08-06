const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../models/category/Category.model");
const { userAuthorization } = require("../middleware/auth.middleware");
const {newCategoryValidation,updateCategoryValidation} = require('../middleware/formValidation.middleware')
router.all("/", (req, res, next) => {
  next();
});
//create category
router.post("/", newCategoryValidation,userAuthorization, async (req, res, next) => {
  try {
    //receive new category
    const { name } = req.body;
    // console.log('name',name)
    //insert category into mongodb
    const newCategory = {
      name,
    };
    console.log("newCat", newCategory);
    const result = await createCategory(newCategory);
    //    console.log('result',result)
    if (result._id) {
      return res.json({ status: "success", message: "created new category " });
    }
    res.json({ status: "error", message: "unable to create new category 1 " });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "unable to create new category 2 " });
  }
});
//get categories
router.get("/", userAuthorization, async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json({
      status: "success",
      message: "list of categories",
      categories,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      status: "error",
      message: "error, unable to process your request, try again",
    });
  }
});
//get single category
router.get("/:_id", userAuthorization, async (req, res, next) => {
  try {
    const { _id } = req.params;
    const category = await getCategory(_id);
    res.json({
      status: "success",
      message: "selected category",
      category,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      status: "error",
      message: "error, unable to process your request, try again",
    });
  }
});
//update a category
router.patch("/:_id",updateCategoryValidation, userAuthorization, async (req, res, next) => {
  try {
    //receive new data
    const { name, parent, img, status } = req.body;

    const newCategoryData = {
      name,
      parent,
      img,
      status,
    };
    const { _id } = req.params;
    const category = await updateCategory({ _id, name, parent, img, status });
    if (category._id) {
      return res.json({
        status: "success",
        message: "updated category",
        category,
      });
    }

    res.status(500).json({
      status: "error",
      message: "error, unable to process your request, try again1",
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      status: "error",
      message: "error, unable to process your request, try again2",
    });
  }
});
//delete a category
router.delete("/:_id", userAuthorization, async (req, res, next) => {
  try {
    const { _id } = req.params;
    const category = await deleteCategory(_id);
    if(category===null){
        return res.json({
            status: "success",
            message: " category doesn't exist",
            
          });
    }
    return res.json({
      status: "success",
      message: "deleted category",
      category,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      status: "error",
      message: "error, unable to process your request, try again2",
    });
  }
});

module.exports = router;
