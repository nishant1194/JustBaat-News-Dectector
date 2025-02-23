const express = require("express");
const router = express.Router();
const searchController = require("../controllers/SearchController");

// CRUD Routes
router.post("/", searchController.createSearch);       // Create search entry
router.get("/", searchController.getAllSearches);      // Get all search entries
router.get("/history/:id", searchController.getSearchById);    // Get search entry by ID
router.get("/:adminid", searchController.getSearchByAdminId);    // Get search entry by ID
router.put("/:id", searchController.updateSearch);     // Update search entry
router.delete("/:id", searchController.deleteSearch);  // Delete search entry

module.exports = router;
