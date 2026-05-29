const Search = require("../models/Search");
const logger = require("../utils/logger");

// implement caching here for 2 to 5 mins
const searchPostController = async (req, res) => {
  logger.info("Search endpoint hit!");
  try {
    const { query } = req.query;
    const cacheKey = `search:${query}`;
    const cachedSearch = await req.redisClient.get(cacheKey);

    if (cachedSearch) {
      return res.json(JSON.parse(cachedSearch));
    }

    const results = await Search.find(
      {
        $text: { $search: query },
      },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    await req.redisClient.setex(cachedSearch, 3600, JSON.stringify(results));

    res.json(results);
  } catch (error) {
    logger.error("Error while searching post", error);
    res.status(500).json({
      success: false,
      message: "Error while searching post",
    });
  }
};

module.exports = { searchPostController };
