"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const xss = require('xss');
const commentData = data.comment;
const userData = data.user;
const path = require("path");
let notFound = path.resolve("./static/404.html");


function checkCommentContent(contents) {
    if(contents.length < 10||contents.length > 100) return false;
    else return true;
}

// get-1: Return all the comments
router.get("/", (req, res) => {
    commentData.getAllComments().then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
         res.json(commentList);
    }, () => {
        res.sendStatus(500);
    });
});

// post-1: Add a comment(at least provide a comment content ).
router.post("/", isLoggedIn, (req, res) => {
    let commentInfo = req.body;
    
    if (!commentInfo.content || !checkCommentContent(commentInfo.content)) {
        res.status(400).json({ error: "You must provide the correct content of the comment if the length is between 10 and 100 characters." });
        return;
    }

    commentData.addComment(xss(commentInfo.content), xss(commentInfo.createTime), xss(commentInfo.stars), xss(req.user._id),xss(commentInfo.belongToId))
        .then((newComment) => {
            newComment.userId = req.user.username;
            res.json({success:true, message: newComment});
        }).catch((e) => {
            res.json({success:false, message: e});

    });
});


// get-2: Return the comment information of the given comment name.
router.get("/:name", (req, res) => {
    commentData.getCommentByName(req.params.name).then((comment) => {
        //res.render('comment/commentList', { list: commentList });
         res.json(comment);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// get-3: Return the comment information of the given comment id.
router.get("/id/:id", (req, res) => {
    commentData.getCommentById(req.params.id).then((comment) => {
        //res.render('comment/commentInfo', { comment: comment });
         res.json(comment);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// get-4: Return all the comment information of the given user id
router.get("/userId/:userId", (req, res) => {
    commentData.getCommentByUserId(req.params.userId).then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
         res.json(commentList);
    }, (error) => {
        res.sendFile(notFound);
    });
});

// get-5: Return all the comment information of the given site id
router.get("/siteId/:siteId", (req, res) => {

    commentData.getCommentBySiteId(req.params.siteId).then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
        //console.log(commentList)
        res.json(commentList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});
// get-6: Return all the comment information of the given city id
router.get("/cityId/:cityId", (req, res) => {

    commentData.getCommentByCityId(req.params.cityId).then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
        //console.log(commentList)
        res.json(commentList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

// get-7: Return all the comment information of the given blog id
router.get("/blogId/:blogId", (req, res) => {
    commentData.getCommentByBlogId(req.params.blogId).then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
        //console.log(commentList)
        res.json(commentList);
    }).catch(() => {
        res.sendFile(notFound);
    });
});

/*// put-1: Update comment with the given comment id.
router.put("/:id", (req, res) => {
    let commentInfo = req.body;

    if (!commentInfo) {
        res.status(400).json({ error: "You must provide data to update a comment." });
        return;
    }
    let getComment = commentData.getCommentById(req.params.id).then(() => {
        return commentData.updateComment(req.params.id, commentInfo)
            .then((updatedComment) => {
                res.json(updatedComment);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });

});*/


/*
// delete-1: Delete comment with the given comment id.
router.delete("/:id", (req, res) => {
    let comment = commentData.getCommentById(req.params.id).then(() => {
        return commentData.removeComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});
*/

/*// delete-2: Delete stars of comment with the given comment id.
router.delete("/stars/:id", (req, res) => {
    let starsInfo = req.body.stars;

    if (!starsInfo) {
        res.status(400).json({ error: "You must provide star to delete." });
        return;
    }
    let comment = commentData.getCommentById(req.params.id).then(() => {
        return commentData.removeCommentStars(req.params.id, stars)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});*/

function isLoggedIn(req, res, next) {
    console.log("isLoggedIn function begin");
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log("authenticated success");
        return next();
    }
    // if they aren't redirect them to the home page
    console.log("authenticated fail go to login page");
    res.json({success: false});
}

module.exports = router;