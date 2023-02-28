const router = require("express").Router();
const { getProducts,postProducts, deleteProducts, putProducts} = require("../controllers/products");

router.route("/").get(getProducts);
router.route("/").post(postProducts);
router.route("/").delete(deleteProducts);
router.route("/").put(putProducts);
// router.route("/").put(putProducts);

module.exports = router;