import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body
        if (!comment) 
            return res.send({message: 'Comment`s can`t be empty'})

        const newComment = new Comment({ comment });
        await newComment.save()
        
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id },
            })
        } catch (error) {
            console.log(error);
            
        }
        return res.send(newComment)
    } catch (error) {
        return res.send({message: 'Error with Something'})
        
    }
}