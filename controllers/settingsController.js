const path = require("path");
const db = require("../db"); // We will create db.js for MySQL connection

exports.getSettings = (req, res) => {
    db.query("SELECT * FROM site_settings LIMIT 1", (err, results) => {
        if (err) throw err;
        res.render("settings", {
            pageTitle: 'Site setting',
            settings: results[0]
        });
    });
};

exports.updateSettings = (req, res) => {
   
    const { sitename, siteemail } = req.body || {};
    if (!sitename || !siteemail) {
        req.flash("error", "Site name and email are required!");
        return res.redirect("/settings");
    }
    let logo = req.files ? req.files.logo : null;
    let logoFileName;

    if (logo) {
        logoFileName = Date.now() + "_" + logo.name;
        logo.mv(path.join(__dirname, "../public/uploads/sitelogo", logoFileName));
    }

    let updateQuery = `
        UPDATE site_settings 
        SET site_name=?, site_email=? ${logo ? ", logo=?" : ""}
        WHERE id=1
    `;

    let params = logo
        ? [sitename, siteemail, logoFileName]
        : [sitename, siteemail];

    db.query(updateQuery, params, (err) => {
        if (err) throw err;
        req.flash("success", "Settings updated successfully!");
       // console.log("Res.locals.success in GET:", res.locals.success);
        res.redirect("/settings");
    });
};
