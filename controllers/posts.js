import Post from "../models/postModel.js";

export const updateUserWithId = async (req, res) => {
  try {
    //patch request to http://localhost:5000/api/posts/1/1 to change post with userId=1 and id=1
    const { id, userId } = req.params;
    const { title, body } = req.body;

    if (title) {
      await Post.updateOne(
        { id, userId },
        {
          title,
          updatedManually: true,
        }
      );
    }

    if (body) {
      await Post.updateOne(
        { id, userId },
        {
          body,
          updatedManually: true,
        }
      );
    }
    res.send(`Post with the id ${id} and userId ${userId} has been updated`);
  } catch (error) {
    console.log(error);
  }
};
