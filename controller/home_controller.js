const Subject=require('../models/subject');



module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.subject =async function (req, res) {

  try {
    
    let subjects= await Subject.find({})
      .populate("user")
      .populate({
        path: "resources",
        populate: {
          path: "user",
        }
      });
      // console.log(subjects);

    return res.render("subject", {
      title: "Blog",
      subjects: subjects,
      branch: req.params.subname,
    });
  } catch (err) {
    console.log(err);
    return;
  }

};

module.exports.signin = function (req, res) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return res.redirect("/");
  }
  return res.render("signin");
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out Successfully");
    res.redirect("/");
  });
};
