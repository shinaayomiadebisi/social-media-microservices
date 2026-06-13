const Search = require("../models/Search");
const logger = require("../utils/logger");

async function invalidateSearchCache(req, input) {
  const cachedKey = `search:${input}`;
  await req.redisClient.del(cachedKey);

  // const keys = await req.redisClient.keys("searches:*");
  // if (keys.length > 0) {
  //   req.redisClient.del(keys);
  // }
}
console.log()
async function handlePostCreated(event) {
  try {
    const newSearchPost = new Search({
      postId: event.postId,
      userId: event.userId,
      content: event.content,
      createdAt: event.createdAt,
    });

    await newSearchPost.save();

    await invalidateSearchCache(event, newSearchPost._id.toString());
    logger.info(
      `Search post created: ${event.postId}, ${newSearchPost._id.toString()}`,
    );
  } catch (e) {
    logger.error(e, "Error handling post creation event");
  }
}

async function handlePostDeleted(event) {
  try {
    await Search.findOneAndDelete({ postId: event.postId });
    logger.info(`Search post deleted: ${event.postId}`);
  } catch (error) {
    logger.error(error, "Error handling post deletion event");
  }
}

module.exports = { handlePostCreated, handlePostDeleted };
