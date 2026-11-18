import db from "../config/database.js";

export const getFeed = () => {
  const query = `
    SELECT
      p.id,
      p.name,
      p.age,
      p.photo,
      p.bio,
      p.city,
      p.interests
    FROM profiles p
    WHERE NOT EXISTS (
      SELECT 1
      FROM swipes s
      WHERE s.profile_id = p.id
    )
    ORDER BY p.id ASC
  `;

  const profiles = db.prepare(query).all();

  return profiles.map((profile) => ({
    ...profile,
    interests: JSON.parse(profile.interests),
  }));
};
