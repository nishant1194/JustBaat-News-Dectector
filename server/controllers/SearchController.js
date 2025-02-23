const Search = require("../models/Search.model");
const axios = require("axios")
// Create a new search entry
exports.createSearch = async (req, res) => {
  try {
    const MlApi = "http://127.0.0.1:5001/predict";
    const { headline, admin } = req.body;
    console.log(headline);
    try {
      const response = await axios.post(MlApi, { headline });
      console.log(response.data)
      console.log("objectu")
      const score = response.data.score ;
      const status = response.data.status;
      if(admin){
       const newSearch = new Search({ headline, status, score, admin });
       await newSearch.save();
       res.status(201).json({ success: true, message: "Search entry created", data: newSearch });
  
      }else{
        res.status(201).json({ success: true, data: {
          headline,
          status,
          score
        } });
      }
      
    } catch (error) {
      console.log("error is "+error)
    }
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating search entry", error: error.message });
  }
};

// Get all search entries
exports.getAllSearches = async (req, res) => {
  try {
    const searches = await Search.find().populate("admin", "name email");
    res.status(200).json({ success: true, data: searches });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching search entries", error: error.message });
  }
};

// Get a single search entry by ID
exports.getSearchById = async (req, res) => {
  try {
    const search = await Search.findById(req.params.id).populate("admin", "name email");

    if (!search) return res.status(404).json({ success: false, message: "Search entry not found" });

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching search entry", error: error.message });
  }
};

// Get a user search entry by ID
exports.getSearchByAdminId = async (req, res) => {
    try {
      const search = await Search.find({admin:req.params.adminid});
  
      if (!search) return res.status(404).json({ success: false, message: "Search entry not found" });
  
      res.status(200).json({ success: true, data: search });
    } catch (error) {
        console.log(error)
      res.status(500).json({ success: false, message: "Error fetching search entry", error: error.message });
    }
  };
  

// Update a search entry
exports.updateSearch = async (req, res) => {
  try {
    const updatedSearch = await Search.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedSearch) return res.status(404).json({ success: false, message: "Search entry not found" });

    res.status(200).json({ success: true, message: "Search entry updated", data: updatedSearch });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating search entry", error: error.message });
  }
};

// Delete a search entry
exports.deleteSearch = async (req, res) => {
  try {
    const deletedSearch = await Search.findByIdAndDelete(req.params.id);

    if (!deletedSearch) return res.status(404).json({ success: false, message: "Search entry not found" });

    res.status(200).json({ success: true, message: "Search entry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting search entry", error: error.message });
  }
};
