import { getFeed } from "../services/feed.service.js";

export const fetchFeed = (req, res, next) => {
  try {
    const profiles = getFeed();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    next(error);
  }
};
