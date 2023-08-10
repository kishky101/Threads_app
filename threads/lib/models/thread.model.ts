import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: String
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})
threadSchema.add({likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
]})

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;




// Access the existing model (replace 'YourModel' with the actual model name)
// const existingModel = mongoose.model('threadSchema');

// Delete the existing model
// mongoose.deleteModel('threadSchema');

// Create the new model
// const newModel = mongoose.model('threadSchema', threadSchema);
