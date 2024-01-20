const Product = require("../models/productModel");
const User = require("../models/userModel");
const catchAsync = require("../middleware/catchAsyncError");

// Get Specific product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("wishlist");
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

// Add the product to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Get My wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  try {
    const user = await User.findById(_id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    throw new Error(error);
  }
});
