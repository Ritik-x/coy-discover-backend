import db from "../config/database.js";

export const createSwipe = (profileId, action) => {
  const swipeTransaction = db.transaction(() => {
    // 1. Check whether profile exists
    const profile = db
      .prepare(
        `
      SELECT id, name, age, photo, bio, city, interests
      FROM profiles
      WHERE id = ?
    `,
      )
      .get(profileId);

    if (!profile) {
      const error = new Error("Profile not found");
      error.statusCode = 404;
      throw error;
    }

    // 2. Check whether user has already swiped
    const existingSwipe = db
      .prepare(
        `
      SELECT id FROM swipes
      WHERE profile_id = ?
    `,
      )
      .get(profileId);

    if (existingSwipe) {
      const error = new Error("You have already swiped on this profile");
      error.statusCode = 409;
      throw error;
    }

    // 3. Save the swipe
    db.prepare(
      `
      INSERT INTO swipes (profile_id, action)
      VALUES (?, ?)
    `,
    ).run(profileId, action);

    // 4. Pass never creates a match
    if (action === "pass") {
      return {
        matched: false,
        match: null,
      };
    }

    // 5. Check whether this profile liked us before
    const incomingLike = db
      .prepare(
        `
      SELECT id
      FROM incoming_likes
      WHERE profile_id = ?
    `,
      )
      .get(profileId);

    // 6. No mutual like
    if (!incomingLike) {
      return {
        matched: false,
        match: null,
      };
    }

    // 7. Mutual like: return matched profile
    return {
      matched: true,
      match: {
        ...profile,
        interests: JSON.parse(profile.interests),
      },
    };
  });

  // Execute all operations atomically
  return swipeTransaction();
};

export const resetSwipes = () => {
  const result = db.prepare("DELETE FROM swipes").run();
  return {
    success: true,
    message: "All swipes have been reset. Profiles restored to feed.",
    deletedCount: result.changes,
  };
};
