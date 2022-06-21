const Subject=require('../models/subject.js');
const Resource=require('../models/resource.js');


module.exports.create = async function(req, res) {



    try {
        let subject = await Subject.findById(req.body.subject);
    
        if (subject) {
          let resource = await Resource.create({
          
            books: req.body.books,
            bookslink: req.body.bookslink,
            papersyear: req.body.papersyear,
            paperslink: req.body.paperslink,
            notes: req.body.notes,
            noteslink: req.body.noteslink,
            user: req.user.id,
            subject: req.body.subject,
            papers: req.body.papers,
            notes: req.body.notes,

          });
          subject.resources.push(resource);
          subject.save();
    
        
    
          req.flash("success", "resource Created");
    
            return res.redirect("back");
        }
      } catch (err) {
        console.log(err);
        req.flash("error", err.message);
        return res.redirect("back");
      }
    };

  
  module.exports.destroy= async function(req, res) {
    try {
        let resource = await Resource.findById(req.params.id);
    
        
        if (resource.user == req.user.id && req.user.isAdmin==true) {
          let subjectId = resource.subject;
    
          resource.remove();
    
          let subject = Subject.findByIdAndUpdate(subjectId, {
            $pull: { resources: req.params.id },
          });
     
      req.flash("success", "Comment deleted!");
    
          return res.redirect("back");
        } else {
          req.flash("error", "Unauthorized");
          return res.redirect("back");
        }
      }
      catch (err) {
        req.flash("error", err);
        console.log(err);
        return;
      }
  };
  


  module.exports.resources = async function (req, res) {
    try {
      
    let subject = await Subject.findById(req.params.id)
        .populate("user")
        .populate({
          path: "resources",
          populate: {
            path: "user",
          }
        })
  
      return res.render("resource", {
        title: "resource",
        subject: subject,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };
  

