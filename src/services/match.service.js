import db from "../config/database.js";

export const getMatches = () => {
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
    INNER JOIN swipes s
      ON s.profile_id = p.id
    INNER JOIN incoming_likes il
      ON il.profile_id = p.id
    WHERE s.action = 'like'
    ORDER BY s.created_at DESC
  `;

  const matches = db.prepare(query).all();

  return matches.map((profile) => ({
    ...profile,
    interests: JSON.parse(profile.interests),
  }));
};
