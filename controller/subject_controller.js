const Subject=require('../models/subject.js');
const Resource=require('../models/resource.js');

module.exports.create = async function(req, res) {

    if (req.isAuthenticated() && req.user.isAdmin==true) {
  
      try {
        console.log(req.body);
        console.log(req.user);
        let subject = await Subject.create({
          user: req.user._id,
          subname: req.body.subname,
          branch:req.body.branch,
          
        });
        return res.redirect('back');
  
    }
    catch(err) {
        req.flash("error",err);
        console.log(err);
        return;
      }
    } else {
      req.flash("error", "Login First");
      return res.redirect("back");
    }
  };



  module.exports.resources= async function(req, res) {
        try {
          console.log(req.params.id);

            let subject = await Subject.findById(req.params.id)
            .populate("user")
            .populate({
              path: "resources",
              populate: {
                path: "user",
              }
            });
            // console.log(subject);
            return res.render("resource", {
                title: "Blog",
                subject: subject,
            });
        }
        catch(err) {
        req.flash("error",err.message);
        console.log(err);
        return;
      }

  };


  module.exports.destroy=async function(req, res)
  {
    try{
      let subject = await Subject.findById(req.params.id);

      if (subject.user == req.user.id && req.user.isadmin==true) {

        

          subject.remove();

          await Resource.deleteMany({subject: req.params.id});
          
        

   
        req.flash("success", "Subject Deleted");
        return res.redirect("back");
      }
      else {
        req.flash("error", "Unauthorized"); //if user is not the owner of the post  then he is not allowed to delete the post     
        return res.redirect("back");
      }

  }
  catch(err) {
    req.flash("error", err);
    console.log(err);
    return res.redirect("back");
  }

  };
  