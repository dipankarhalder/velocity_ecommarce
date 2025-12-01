/** Node modules */
import express from "express";

/** Custom modules */
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";
import { refreshToken } from "../controllers/auth/refreshToken.js";
import { logout } from "../controllers/auth/logout.js";

/** Profile */
import { details } from "../controllers/profile/details.js";
import { updateProfile } from "../controllers/profile/updateProfile.js";
import { uploadImage } from "../controllers/profile/uploadImage.js";

/** Brand */
import { createBrand } from "../controllers/brands/brandCreate.js";
import { listBrand } from "../controllers/brands/brandList.js";
import { brandDetails } from "../controllers/brands/brandDetails.js";
import { deleteBrand } from "../controllers/brands/brandDelete.js";
import { updateBrand } from "../controllers/brands/brandUpdate.js";

/** Category */
import { createCategory } from "../controllers/category/createCategory.js";
import { updateCategory } from "../controllers/category/updateCategory.js";
import { listCategory } from "../controllers/category/listCategory.js";
import { categoryDetails } from "../controllers/category/categoryDetails.js";
import { deleteCategory } from "../controllers/category/deleteCategory.js";

/** Sub Category */
import { createSubCategory } from "../controllers/subCategory/createSubCategory.js";
import { updateSubCategory } from "../controllers/subCategory/updateSubCategory.js";
import { listSubCategory } from "../controllers/subCategory/listSubCategory.js";
import { subCategoryDetails } from "../controllers/subCategory/subCategoryDetails.js";
import { deleteSubCategory } from "../controllers/subCategory/deleteSubCategory.js";

/** Brand */
import { createProduct } from "../controllers/product/createProduct.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { listProduct } from "../controllers/product/listProduct.js";
import { productDetails } from "../controllers/product/productDetails.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";

/** Middlewares */
import { authenticate } from "../middleware/authenticate.middleware.js";
import { requireRefreshToken } from "../middleware/refreshToken.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { upload } from "../middleware/uploadFile.middleware.js";

/** Validation */
import { registerValidation, loginValidation, updateAccountValidation } from "../validate/user.validate.js";
import { createBrandValidation, updateBrandValidation } from "../validate/brand.validate.js";
import { createCategoryValidation, updateCategoryValidation } from "../validate/category.validate.js";
import { createSubCategoryValidation, updateSubCategoryValidation } from "../validate/subcategory.validate.js";
import { createProductValidation, updateProductValidation } from "../validate/product.validate.js";

/** Initialize router */
const router = express.Router();

/** route lists */
router.post("/auth/login", validate(loginValidation), login);
router.post("/auth/register", validate(registerValidation), register);
router.post("/auth/refresh-token", requireRefreshToken, refreshToken);
router.post("/auth/logout", authenticate, logout);

/** Profile */
router.get("/profile/me", authenticate, details);
router.put("/profile/update", validate(updateAccountValidation), authenticate, updateProfile);
router.post("/profile/upload", authenticate, upload.single("profileImage"), uploadImage);

/** Brand */
router.post("/brand/create", authenticate, upload.single("brandImage"), validate(createBrandValidation), createBrand);
router.get("/brand/list", authenticate, listBrand);
router.get("/brand/details/:id", authenticate, brandDetails);
router.delete("/brand/delete/:id", authenticate, deleteBrand);
router.put("/brand/update/:id", authenticate, upload.single("brandImage"), validate(updateBrandValidation), updateBrand);

/** Category */
router.post("/category/create", authenticate, upload.single("categoryImage"), validate(createCategoryValidation), createCategory);
router.put("/category/update/:id", authenticate, upload.single("categoryImage"), validate(updateCategoryValidation), updateCategory);
router.get("/category/list", authenticate, listCategory);
router.get("/category/details/:id", authenticate, categoryDetails);
router.delete("/category/delete/:id", authenticate, deleteCategory);

/** Sub Category */
router.post("/subCategory/create", authenticate, upload.single("subCategoryImage"), validate(createSubCategoryValidation), createSubCategory);
router.put("/subCategory/update/:id", authenticate, upload.single("subCategoryImage"), validate(updateSubCategoryValidation), updateSubCategory);
router.get("/subCategory/list", authenticate, listSubCategory);
router.get("/subCategory/details/:id", authenticate, subCategoryDetails);
router.delete("/subCategory/delete/:id", authenticate, deleteSubCategory);

/** Products */
router.post("/product/create", authenticate, upload.array("images", 10), validate(createProductValidation), createProduct);
router.put("/product/update/:id", authenticate, upload.array("images", 10), validate(updateProductValidation), updateProduct);
router.get("/product/list", authenticate, listProduct);
router.get("/product/details/:id", authenticate, productDetails);
router.delete("/product/delete/:id", authenticate, deleteProduct);

export default router;
