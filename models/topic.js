import mongoose,{Schema} from "mongoose";

const topicSchema = new Schema(
    {
        title:String,
        description:String,
        createdAt:{
            type:Date,
            default:Date.now,
        }
    },
    {
        timestamps:true
    }
)

const Topic  = mongoose.models.Topic || mongoose.model("Topic", topicSchema )

export default Topic;