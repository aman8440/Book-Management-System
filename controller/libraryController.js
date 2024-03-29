var passport = require("passport");
const {User}= require('../model/user_model');
const {Book}= require('../model/book_model');
const {BorrowerRecord}= require('../model/borrow_book');
const {ReturnRecord}= require('../model/return_model');
const Admin= require('../model/admin_model');

const CreatebookFunction = async (req, res) => {
   try {
      const Adminuser = await Admin.findOne({ email: req.body.adminid });
     
      if (!Adminuser) {
          return res.status(404).json({ status: 404, message: "Admin not found" });
      }

      const data = await Book.findOne({ adminid: Adminuser._id.toString() });
      var book = new Book({
         name: req.body.name,
         author: req.body.author,
         genre: req.body.genre,
         type: req.body.type,
         available: req.body.available,
         adminid: Adminuser._id.toString()
      });
       // Authentication
       passport.authenticate("jwt", { session: false }, async (err, user) => {
           if (err || !user) {
               return res.status(401).json({ status: 401, message: "Not Authorized" });
           }

           if (user.admin) {
               // Saving book to db
               await book.save()
                   .then(saveres => {
                       if (saveres) {
                           res.json({ status: 200, message: saveres });
                       }
                   })
                   .catch(err => {
                       res.status(500).json({ status: 500, message: "Internal Server Error" });
                   });
           } else {
               res.status(401).json({ status: 401, message: "You are not authorized to perform this action" });
           }
       })(req, res);
   } catch (error) {
       res.status(500).json({ status: 500, message: error.message });
   }
}


const borrow= async (req,res)=>{
   const Adminuser = await Admin.findOne({ email: req.body.adminid });
   if (!Adminuser) {
         return res.status(404).json({ status: 404, message: "Admin not found" });
   }

   await BorrowerRecord.findOne({ adminid: Adminuser._id.toString() });
   var bookid = req.body.bookid;
   var borrowerusername = req.body.username;

   //authentication
   passport.authenticate("jwt", { session: false }, async (err, user) => {
      if (err || !user) {
            res.json({ status: 401, message: "Not Authorized" });
      } else {
            if (user.admin) {
               User.findOne({ username: borrowerusername })
                  .then((user) => {
                        if (user) {
                           Book.findOne({ _id: bookid })
                              .then((book) => {
                                    if (book) {
                                       if (book.available) {
                                          //creating and saving new borrower record in database.
                                          var newBorrowerRecord =
                                                new BorrowerRecord({
                                                   username: user.username,
                                                   bookid: book["_id"],
                                                   adminid: Adminuser._id.toString()
                                                });
                                          newBorrowerRecord
                                                .save()
                                                .then((saveres) => {
                                                   if (saveres) {
                                                      Book.where({
                                                            _id: book["_id"],
                                                      })
                                                            .updateOne({
                                                               available: false,
                                                            })
                                                            .then((updtres) => {
                                                               res.json({
                                                                  status: 200,
                                                                  message:
                                                                        "book borrowed successfully by " +
                                                                        user.username,
                                                               });
                                                            });
                                                   } else {
                                                      res.json({
                                                            status: 500,
                                                            message:
                                                               "Error Borrowing Book",
                                                      });
                                                   }
                                                })
                                                .catch((err) => {
                                                   res.json({
                                                      status: 500,
                                                      message:
                                                            "Error Borrowing Book",
                                                   });
                                                });
                                       } else {
                                          res.json({
                                                status: 500,
                                                message:
                                                   "Book Is not available",
                                          });
                                       }
                                    } else {
                                       res.json({
                                          status: 500,
                                          message:
                                                "Book with Id Does Not Exist",
                                       });
                                    }
                              })
                              .catch((err) => {
                                    res.json({
                                       status: 500,
                                       message: "Internal Server Error",
                                    });
                              });
                        } else {
                           res.json({
                              status: 500,
                              message: "Borrower Does Not Exist",
                           });
                        }
                  })
                  .catch((err) => {
                        res.json({
                           status: 500,
                           message: "Internal Server Error",
                        });
                  });
            } else {
               res.json({
                  status: 401,
                  message: "You are not authorized to perform this action",
               });
            }
      }
   })(req, res);
};

const returnFunction= async (req,res)=>{
   const Adminuser = await Admin.findOne({ email: req.body.adminid });
   if (!Adminuser) {
         return res.status(404).json({ status: 404, message: "Admin not found" });
   }

   await ReturnRecord.findOne({ adminid: Adminuser._id.toString() });
   var bookid = req.body.bookid;
   var borrowerusername = req.body.username;

   //authentication
   passport.authenticate("jwt", { session: false }, async (err, user) => {
      if (err || !user) {
         res.json({ status: 401, message: "Not Authorized" });
      } else {
         if (user.admin) {
               //checking for existance of borrower record in db
               BorrowerRecord.findOne({
                  bookid: bookid,
                  username: borrowerusername,
               })
                  .then((borrowrec) => {
                     if (borrowrec) {
                           var todaysdate = new Date().toISOString();

                           //calculation of fine if delayed in returning
                           const fine = 0;
                           if (todaysdate > borrowrec.submitdate) {
                              const diffTime = Math.abs(
                                 todaysdate - borrowrec.submitdate
                              );
                              const diffDays = Math.ceil(
                                 diffTime / (1000 * 60 * 60 * 24)
                              );

                              fine = diffDays * 2;
                           }

                           //creating and saving new return record.
                           var returnrec = new ReturnRecord({
                              username: borrowerusername,
                              bookid: bookid,
                              duedate: borrowrec.submitdate,
                              fine: fine,
                              adminid: Adminuser._id.toString()
                           });

                           returnrec
                              .save()
                              .then((saveres) => {
                                 if (saveres) {
                                       Book.findOne({ _id: bookid })
                                          .updateOne({ available: true })
                                          .then((updtres) => {
                                             if (updtres) {
                                                   res.json({
                                                      status: 200,
                                                      message:
                                                         "Book Returned Successfully",
                                                   });
                                             } else {
                                                   res.json({
                                                      status: 500,
                                                      message:
                                                         "Error Creating Return Record",
                                                   });
                                             }
                                          });
                                 } else {
                                       res.json({
                                          status: 500,
                                          message:
                                             "Error Creating Return Record",
                                       });
                                 }
                              })
                              .catch((err) => {
                                 res.json({
                                       status: 500,
                                       message: "Internal Server Error",
                                 });
                              });
                     } else {
                           res.json({
                              status: 500,
                              message: "No Record Found",
                           });
                     }
                  })
                  .catch((err) => {
                     res.json({
                           status: 500,
                           message: "Internal Server Error",
                     });
                  });
         } else {
               res.json({
                  status: 401,
                  message: "You are not authorized to perform this action",
               });
         }
      }
   })(req, res);
};

const fineFunction= async (req,res)=>{
   var returnrecid = req.body.returnrecordid;
 
    //authentication
    passport.authenticate("jwt", { session: false }, async (err, user) => {
        if (err || !user) {
            res.json({ status: 401, message: "Not Authorized" });
        } else {
            if (user.admin) {
                //paying fine by updating return record in database.
                ReturnRecord.findOne({ _id: returnrecid })
                    .updateOne({ fine: 0 })
                    .then((updtres) => {
                        if (updtres) {
                            res.json({
                                status: 200,
                                message: "Fine Paid Successfully",
                            });
                        } else {
                            res.json({
                                status: 500,
                                message: "Error paying Fine",
                            });
                        }
                    })
                    .catch((err) => {
                        res.json({
                            status: 500,
                            message: "Internal Server Error",
                        });
                    });
            } else {
                res.json({
                    status: 401,
                    message: "You are not authorized to perform this action",
                });
            }
        }
    })(req, res);
};

module.exports= {
   CreatebookFunction,
   borrow,
   returnFunction,
   fineFunction
};
