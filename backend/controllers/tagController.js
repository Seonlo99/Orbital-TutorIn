import Tag from "../models/Tag.js";

const addTag = async (req, res) => {
    try{
        const { tag } = req.body;
        const tags = await Tag.create({
            tag: tag,
        });

        return res.json({tags})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const getAllTags = async ()=>{
    try{
        const tags = await Tag.find()

        return tags

    } catch (error){
        return json({message:"Error getting tags!"})
    }
}

const getAllTagsArray = async ()=>{
    try{
        const tags = await Tag.find()
        const formattedTags = tags.map((tag)=> {return tag.tag})
        return formattedTags

    } catch (error){
        return json({message:"Error getting tags!"})
    }
}


const getAllFormattedTags = async (req,res)=>{
    try{
        const tags = await getAllTags()
        const formattedTags = tags.map((tag)=> ({value:tag.tag, label:tag.tag}))

        return res.json({formattedTags})
    }
    catch (error){
        return res.status(500).json({message:error.message})
    } 
}


export {addTag, getAllFormattedTags, getAllTagsArray}