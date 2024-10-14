const projects = require('../Models/projectSchema')

//add a new project
exports.addProject = async (req, res) => {
    console.log("inside add project controller");
    const userId = req.payload;
    console.log("user Id:-", userId);



    //request we re getting is form data
    //so it is not possible to directly access the data
    //we need use multer module  to deal with multipart/form data

    const projectImage = req.file.filename
    console.log("image file name", projectImage);
    const { title, language, github, website, overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(409).json("Project alreadt exist")
        }
        else {
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            });
            await newProject.save()
            res.status(200).json("project uploaded successfully")
        }
    }
    catch (err) {
        res.status(401).json("project upload failed", err)
    }
}
//1)1get any 3 projects details for home page
exports.getHomeProject = async (req, res) => {
    console.log("inside get home poject");

    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch (err) {
        res.send(401).json("request failed due to", err)
    }
}
// 2) get all projects 
exports.getAllProject = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
    const searchQuery = {
        // language:{
        //     // i is used to remove casesensitivity
        //     $regex:searchKey,$options:'i'
        // }
        $or: [{
            language: {
                $regex: searchKey,
                $options: 'i'
            },
            title: {
                $regex: searchKey,
                $options: 'i'
            }
        }]
    }

    try {
        const allProject = await projects.find(searchQuery);
        res.status(200).json(allProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}
// 3) gett all projects uploaded by that specific user
exports.getUserProject = async (req, res) => {
    userId = req.payload;
    try {
        const allUserProject = await projects.find({ userId: userId });
        res.status(200).json(allUserProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}


exports.editUserProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { title, language, github, website, overview, projectImage } = req.body;
    const uploadedProjectImage = req.file ? req.file.filename : projectImage;
    try {
        const updateProject = await projects.findByIdAndUpdate(
            { _id: id }, {
            title: title,
            language: language,
            github: github,
            website: website,
            overview: overview,
            projectImage: uploadedProjectImage,
            userId: userId
        },
            {
                new: true,
            }
        );
        await updateProject.save();
        res.status(200).json(updateProject)
    }
    catch (error) {
        res.status(401).json(error)
    }

}


// exports.deleteUserProject = async (req, res) => {
//     console.log("Inside delete controller")
//     const { id } = req.params;
//     console.log(id)
//     try {
//         const removedProject = await projects.findByIdAndDelete({_id:id});
//         res.status(200).json(removedProject)
//     }
//     catch (err) {
//         res.status(401).json(err)
//     }
// }
exports.deleteUserProject = async (req, res) => {
    console.log("Inside delete controller")
    const { id } = req.params;
    console.log(id)
    try {
        const removedProject = await projects.findByIdAndDelete({_id:id});
        res.status(200).json(removedProject)
    }
    catch (err) {
        res.status(401).json(err)
    }
}