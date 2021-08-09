const Blog = require("../models/blog");

const blog_index = (req, res) => {
    Blog.find()
        .then(result => {
            res.render('index', { title: 'Home', blogs: result })
        })
        .catch(err => console.log(err))
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { title: "Blog Details", blog: result})
        })
        .catch(err => {
            res.status(404).render('404', {title: "404"})
        })
}
const blog_delete =(req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/'})
        })
        .catch(err => {
            console.log(err)
        })
}
const blog_create_post = (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog.save()
        .then(res.redirect('/'))
        .catch(err => console.log(err))
}
module.exports = {
    blog_index,
    blog_details,
    blog_delete,
    blog_create_post
}