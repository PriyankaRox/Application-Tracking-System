const Upload_folder = "uploads/"
const fileupload = (uploadedFileName) => async (req, res, next) => {
  console.log("hello",req.body,req.files);
  try {
    if (req.files[uploadedFileName]) {
      let uploadedFile = req.files[uploadedFileName];
      const fileNameArray = uploadedFile.name.split(".")
      const newName = Math.floor(+new Date() / 1000) + '.' + fileNameArray[fileNameArray.length - 1];
      await uploadedFile.mv('./'+Upload_folder + newName);
      req.body[uploadedFileName] = Upload_folder + newName
    }
    next()
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: "File not uploaded"});
  }
}
module.exports = { fileupload }