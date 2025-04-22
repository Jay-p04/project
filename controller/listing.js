const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", { allListings });
};

module.exports.newroute = (req, res) => {
   res.render("listings/new.ejs");
};
module.exports.findOne = async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id)
      .populate({
         path: "reviews",
         populate: { path: "author" },
      }).populate("owner");
   if (!listing) {
      req.flash("error", "You are trying to retrieve a listing that does not exist.");
      return res.redirect("/listings");
   }
   let location = listing.location;
   let country = listing.country;
   const address = ` ${location, country}`;

   fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(response => response.json())
      .then(data => {
         if (data.length > 0) {
           let lat = data[0].lat;
           let lon = data[0].lon;
            // console.log(`Latitude: ${lat}, Longitude: ${lon}`);
         } else {
            req.flash("error", "please enter valid location");
            console.log("No results found.");
         }
      });
   res.render("./listings/show.ejs", { listing,lat, lon });
};

module.exports.edit = async (req, res) => {
   let { id } = req.params;
   const listing = await Listing.findById(id);
   if (!listing) {
      req.flash("error", "You are trying to retrieve a listing that does not exist.");
      return res.redirect("/listings");
   }
   let originalUrl = listing.image.url;
   originalUrl = originalUrl.replace("/upload", "/upload/w_25");
   res.render("./listings/edit.ejs", { listing, originalUrl });
}

module.exports.newpost = async (req, res, next) => {
   // if(!req.body.Listing){
   //    throw new expressError(400,"send valid data for listing ");
   // }
   let url = req.file.path;
   let fileName = req.file.filename;
   console.log(url, "...", fileName)
   let newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   newListing.image = { url, fileName };
   await newListing.save();
   req.flash("success", "New Listing Created");
   res.redirect("/listings");
};

module.exports.update = async (req, res) => {
   let { id } = req.params;
   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if (typeof req.file != "undefined") {
      let url = req.file.path;
      let fileName = req.file.filename;
      listing.image = { url, fileName };
      await listing.save();
   }
   req.flash("success", "Listing Updated");
   // console.log(req.body.image.url);
   res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
   let { id } = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   req.flash("success", "Listing deleted");
   res.redirect("/listings");
};

