const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret = '1dc884b987bb3ca0642f6be226e65408bf1c5e217ac3e4eb2463d96a4febefd5970db0efbeb9df5749';
const Blog = require('../models/blog');



const db = "mongodb://localhost:27017/raj-demo";
mongoose.Promise = global.Promise;

mongoose.connect(db, (err) => {
    if (err) {
        console.log("Error !" + err);
    }
});

router.get('/', function (req, res) {
    res.send('Api Works');
});


router.post('/register', (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ success: false, message: 'You must provide an e-mail' });
    } else {
        if (!req.body.username) {
            res.status(400).json({ success: false, message: 'You must provide a username' });
        } else {
            if (!req.body.mobile) {
                res.status(400).json({ success: false, message: 'You must provide a mobile number' });
            } else {
                if (!req.body.password) {
                    res.status(400).json({ success: false, message: 'You must provide a password' });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        mobile: req.body.mobile,
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.status(400).json({ success: false, message: 'E-mail or Username already exists..!' });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.status(400).json({ success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username) {
                                            res.status(400).json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password) {
                                                res.status(400).json({ success: false, message: err.errors.password.message });
                                            } else {
                                                if (err.errors.mobile) {
                                                    res.status(400).json({ success: false, message: err.errors.mobile.message })
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    console.log(err);
                                    res.status(400).json({ success: false, message: 'Could not save user. Error:', err });
                                }
                            }
                        } else {
                            res.status(200).json({ success: true, message: 'User saved successfully !' });
                        }
                    });
                }
            }
        }
    }

});


// router.get('/checkEmail/:email',(req,res)=>{
//     let x=req.params.email;
//     res.send(x);
// });


router.get('/checkEmail/:email', (req, res) => {
    // res.send(req.params.email);
    if (!req.params.email) {
        res.status(400).json({ success: false, message: 'Email was not provided' });
    } else {
        User.findOne({ email: req.params.email }, (err, user) => {
            if (err) {
                console.log('err', err)
                res.status(400).json({ success: false, message: err });
            } else {
                if (user) {
                    res.status(400).json({ success: false, message: 'Email is already taken.' });
                } else {
                    console.log('Email is available.');
                    res.status(200).json({ success: true, message: 'Email is available.' });
                }
            }
        });
    }
});

router.get('/checkUsername/:username', (req, res) => {
    if (!req.params.username) {
        res.status(400).json({ success: false, message: 'Username was not provided' });
    } else {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) {
                res.status(400).json({ success: false, message: err });
            } else {
                if (user) {
                    res.status(400).json({ success: false, message: 'Username is already taken.' });
                } else {
                    res.status(200).json({ success: true, message: 'Username is available.' });
                }
            }
        });
    }
});

// router.post('/login',(req,res)=>{
//     if(!req.body.username){
//         res.json({success:false,message:'Username was not provided'});
//     }else{
//         if(!req.body.password){
//             res.json({success:false,message:'Password was not provided'});
//         }else{
//             User.findOne({username: req.body.username} && {password: req.body.password},(err,user)=>{
//                 if(err){
//                     res.json({success:false,message:err});
//                 }else{
//                     // res.send(user);
//                     res.json({success:true,message:'Success'}); 
//                 }
//             });
//         }
//     }
// });


router.post('/login', (req, res) => {
    if (!req.body.username) {
        res.status(400).json({ success: false, message: 'Username was not provided' });
    } else {
        if (!req.body.password) {
            res.status(400).json({ success: false, message: 'Password was not provided' });
        } else {
            User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                if (err) {
                    res.status(400).json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.status(400).json({ success: false, message: 'Username not valid.' });
                    } else {
                        const validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.status(400).json({ success: false, message: 'Password invalid' });
                        } else {
                            const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24h' });
                            res.status(200).json({ success: true, message: 'Success', token: token, user: { userId: user._id, username: user.username } });
                        }
                    }
                }
            });
        }
    }
});

// router.get('/singleBlog/:id',(req,res)=>{
//     if(!req.params.id){
//         res.json({ success: false, message: 'Id was not provided.'});
//     }else{
//         Blog.findOne({_id:req.params.id}, (err,blog)=>{
//             if(err){
//                 res.json({ success: false, message: err});
//             }else{
//                 if(!blog){
//                     res.json({ success: false, message: 'No blog found.'});
//                 }else{
//                     User.findOne({_id:req.decoded.userId},(err,user)=>{
//                         if(err){
//                             res.json({ success: false, message: err});
//                         }else{
//                             if(!user){
//                                 res.json({success:false, message:'Unable to authenticate user.'});
//                             }else{
//                                 if(user.username !== blog.createdBy){
//                                     res.json({success:false, message:'You are not authorized to edit this blog.'});
//                                 }else{
//                                     res.json({ success: true, blog: blog});
//                                 }
//                             }
//                         }
//                     })
//                 }
//             }
//         });
//     }
// });

// router.put('/ipdateBlog',(req,res)=>{
//     if(!req.body._id){
//         res.json({ success: false, message: 'Id was not provided.'});
//     }else{
//         Blog.findOne({_id:req.body._id},(err,blog)=>{
//             if(err){
//                 res.json({ success: false, message:'Not valid blog Id.'});
//             }else{
//                 if(!blog){
//                     res.json({ success: false, message: 'Blog not found.'});
//                 }else{
//                     User.findOne({_id:req.decoded.userId},(err,user)=>{
//                         if(err){
//                             res.json({ success: false, message:err});
//                         }else{
//                             if(!user){
//                                 res.json({ success: false, message: 'Unable to authenticate user.'});
//                             }else{
//                                 if(user.username !== blog.createdBy){
//                                     res.json({ success: false, message: 'You are not authenticate to edit this blog post.'});
//                                 }else{
//                                     blog.title=req.body.title;
//                                     blog.body=req.body.body;
//                                     blog.save((err)=>{
//                                         if(err){
//                                             res.json({ success: false, message:err});
//                                         }else{
//                                             res.json({success:true, message:'Blog updated.'})
//                                         }
//                                     })
//                                 }
//                             }
//                         }
//                     })
//                 }
//             }
//         })
//     }
// })


router.use((req, res, next) => {
    const token = req.headers['authorization'];
    // console.log('token', token)

    if (!token) {
        res.status(400).json({ success: false, message: 'No token provided' });
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(400).json({ success: false, message: 'Token Invalid:' + err });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
});


router.post('/newBlog', (req, res) => {
    if (!req.body.title) {
        res.status(400).json({ success: false, message: 'Blog title was not provided.' });
    } else {
        if (!req.body.body) {
            res.status(400).json({ success: false, message: 'Blog body was not provided.' });
        } else {
            if (!req.body.createdBy) {
                res.status(400).json({ success: false, message: 'Blog creator was not provided.' });
            } else {
                const blog = new Blog({
                    title: req.body.title,
                    body: req.body.body,
                    createdBy: req.body.createdBy
                });
                blog.save((err) => {
                    if (err) {
                        if (err.errors) {
                            if (err.errors.title) {
                                res.status(400).json({ success: false, message: err.errors.title.message });
                            } else {
                                if (err.errors.body) {
                                    res.status(400).json({ success: false, message: err.errors.body.message });
                                } else {
                                    res.status(400).json({ success: false, message: errmsg });
                                }
                            }
                        } else {
                            res.status(400).json({ success: false, message: err });
                        }
                    } else {
                        res.status(200).json({ success: true, message: 'Blog saved!' });
                    }
                });
            }
        }
    }
});

router.get('/allBlogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            res.status(400).json({ success: false, message: err });
        } else {
            if (!blogs) {
                res.status(400).json({ success: false, message: 'No blogs found !' });
            } else {
                res.status(200).json({ success: true, message: blogs });
            }
        }
    }).sort({ '_id': -1 });
});


router.get('/profile', (req, res) => {
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
        if (err) {
            res.status(400).json({ success: false, message: err });
        } else {
            if (!user) {
                res.status(400).json({ success: false, message: 'User not found.' });
            } else {
                res.status(200).json({ success: true, user: user });
            }
        }
    })
});

router.get('/singleBlog/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ success: false, message: 'Id was not provided.' });
    } else {
        Blog.findOne({ _id: req.params.id }, (err, blog) => {
            if (err) {
                res.status(400).json({ success: false, message: err });
            } else {
                if (!blog) {
                    res.status(400).json({ success: false, message: 'No blog found.' });
                } else {
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if (err) {
                            res.status(400).json({ success: false, message: err });
                        } else {
                            if (!user) {
                                res.status(400).json({ success: false, message: 'Unable to authenticate user.' });
                            } else {
                                if (user.username !== blog.createdBy) {
                                    res.status(400).json({ success: false, message: 'You are not authorized to edit this blog.' });
                                } else {
                                    res.status(200).json({ success: true, blog: blog });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});

router.put('/updateBlog', (req, res) => {
    if (!req.body._id) {
        res.status(400).json({ success: false, message: 'Id was not provided.' });
    } else {
        Blog.findOne({ _id: req.body._id }, (err, blog) => {
            if (err) {
                res.status(400).json({ success: false, message: 'Not valid blog Id.' });
            } else {
                if (!blog) {
                    res.status(400).json({ success: false, message: 'Blog not found.' });
                } else {
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if (err) {
                            res.status(400).json({ success: false, message: err });
                        } else {
                            if (!user) {
                                res.status(400).json({ success: false, message: 'Unable to authenticate user.' });
                            } else {
                                if (user.username !== blog.createdBy) {
                                    res.status(400).json({ success: false, message: 'You are not authenticate to edit this blog post.' });
                                } else {
                                    blog.title = req.body.title;
                                    blog.body = req.body.body;
                                    blog.save((err) => {
                                        if (err) {
                                            res.status(400).json({ success: false, message: err });
                                        } else {
                                            res.status(200).json({ success: true, message: 'Blog updated.' })
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});

router.delete('/deleteBlog/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ success: false, message: 'Id was not provided.' });
    } else {
        Blog.findOne({ _id: req.params.id }, (err, blog) => {
            if (err) {
                res.status(400).json({ success: false, message: err });
            } else {
                if (!blog) {
                    res.status(400).json({ success: false, message: 'Blog not found.' });
                } else {
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if (err) {
                            res.status(400).json({ success: false, message: err });
                        } else {
                            if (!user) {
                                res.status(400).json({ success: true, message: 'Unable to authenticate the user.' })
                            } else {
                                if (user.username !== blog.createdBy) {
                                    res.status(400).json({ success: true, message: 'You are not authorized to delete this post.' })
                                } else {
                                    blog.remove((err) => {
                                        if (err) {
                                            res.status(400).json({ success: true, message: err });
                                        } else {
                                            res.status(200).json({ success: true, message: 'Blog deleted.' })
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});

router.put('/likeBlog', (req, res) => {
    if (!req.body.id) {
        res.status(400).json({ success: false, message: 'Id was not provided.' });
    } else {
        Blog.findOne({ _id: req.body.id }, (err, blog) => {
            if (err) {
                res.status(400).json({ success: false, message: err });
            } else {
                if (!blog) {
                    res.status(400).json({ success: false, message: 'Blog not found.' });
                } else {
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if (err) {
                            res.status(400).json({ success: false, message: err });
                        } else {
                            if (!user) {
                                res.status(400).json({ success: false, message: 'Cannot authenticate User.' });
                            } else {
                                if (user.username === blog.createdBy) {
                                    res.status(400).json({ success: false, message: 'Cannot like your own post.' });
                                } else {
                                    if (blog.likedBy.includes(user.username)) {
                                        res.status(400).json({ success: false, message: 'You already like this post.' });
                                    } else {
                                        if (blog.dislikedBy.includes(user.username)) {
                                            blog.dislikes--;
                                            const arrayIndex = blog.dislikedBy.indexOf(user.username);
                                            blog.dislikedBy.splice(arrayIndex, 1);
                                            blog.likes++;
                                            blog.likedBy.push(user.username);
                                            blog.save((err, savedBlog) => {
                                                if (err) {
                                                    res.status(400).json({ success: false, message: err });
                                                } else {
                                                    res.status(200).json({ success: true, message: 'Blog liked!', newBlog: savedBlog });
                                                }
                                            });
                                        } else {
                                            blog.likes++;
                                            blog.likedBy.push(user.username);
                                            blog.save((err, savedBlog) => {
                                                if (err) {
                                                    res.status(400).json({ success: false, message: err });
                                                } else {
                                                    res.status(200).json({ success: true, message: 'Blog liked!', newBlog: savedBlog });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});



router.put('/dislikeBlog', (req, res) => {
    if (!req.body.id) {
        res.status(400).json({ success: false, message: 'Id was not provided.' });
    } else {
        Blog.findOne({ _id: req.body.id }, (err, blog) => {
            if (err) {
                res.status(400).json({ success: false, message: err });
            } else {
                if (!blog) {
                    res.status(400).json({ success: false, message: 'Blog not found.' });
                } else {
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                        if (err) {
                            res.status(400).json({ success: false, message: err });
                        } else {
                            if (!user) {
                                res.status(400).json({ success: false, message: 'Cannot authenticate User.' });
                            } else {
                                if (user.username === blog.createdBy) {
                                    res.status(400).json({ success: false, message: 'Cannot like your own post.' });
                                } else {
                                    if (blog.dislikedBy.includes(user.username)) {
                                        res.status(400).json({ success: false, message: 'You already dislike this post.' });
                                    } else {
                                        if (blog.likedBy.includes(user.username)) {
                                            blog.likes--;
                                            const arrayIndex = blog.likedBy.indexOf(user.username);
                                            blog.likedBy.splice(arrayIndex, 1);
                                            blog.dislikes++;
                                            blog.dislikedBy.push(user.username);
                                            blog.save((err, savedBlog) => {
                                                if (err) {
                                                    res.status(400).json({ success: false, message: err });
                                                } else {
                                                    res.status(200).json({ success: true, message: 'Blog disliked!', newBlog: savedBlog });
                                                }
                                            });
                                        } else {
                                            blog.dislikes++;
                                            blog.dislikedBy.push(user.username);
                                            blog.save((err, savedBlog) => {
                                                if (err) {
                                                    res.status(400).json({ success: false, message: err });
                                                } else {
                                                    res.status(200).json({ success: true, message: 'Blog liked!', newBlog: savedBlog });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});


router.post('/comment', (req, res) => {
    if (!req.body.comment) {
        res.status(400).json({ success: false, message: 'Comment was not provided.' });
    } else {
        if (!req.body.id) {
            res.status(400).json({ success: false, message: 'Id was not provided.' });
        } else {
            Blog.findOne({ _id: req.body.id }, (err, blog) => {
                if (err) {
                    res.status(400).json({ success: false, message: err });
                } else {
                    if (!blog) {
                        res.status(400).json({ success: false, message: 'Blog not found.' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.status(400).json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.status(400).json({ success: false, message: 'Cannot authenticate user.' });
                                } else {
                                    blog.comments.push({
                                        comment: req.body.comment,
                                        commentator: user.username
                                    });
                                    blog.save((err, savedBlog) => {
                                        if (err) {
                                            res.status(400).json({ success: false, message: err });
                                        } else {
                                            res.status(200).json({ success: true, message: 'Comment Saved.', newBlog: savedBlog });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }
});

module.exports = router;

