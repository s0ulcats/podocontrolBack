import Dialog from '../models/Dialog.js'
import Post from '../models/Post.js'

export const createMessage = async (req, res) => {
    try {
        const { userId, message } = req.body
        if (!message) 
            return res.send({message: 'Chat is empty'})

        const newMessage = new Dialog({ message });
        await newMessage.save()
        return res.send(newMessage)
    } catch (error) {
        return res.send({message: 'Error with Something'})
        
    }
}