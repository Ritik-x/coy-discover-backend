import db from "../config/database.js";

const profiles = [
  {
    name: "Aarav Sharma",
    age: 24,
    bio: "Coffee enthusiast and weekend explorer.",
    city: "Delhi",
    interests: ["Travel", "Photography", "Coffee"],
  },
  {
    name: "Priya Verma",
    age: 23,
    bio: "Love exploring new places and trying food.",
    city: "Noida",
    interests: ["Food", "Music", "Travel"],
  },
  {
    name: "Kabir Malhotra",
    age: 25,
    bio: "Software developer who loves adventure.",
    city: "Gurgaon",
    interests: ["Technology", "Gaming", "Fitness"],
  },
  {
    name: "Ananya Singh",
    age: 22,
    bio: "Artist by passion, traveler by heart.",
    city: "Delhi",
    interests: ["Art", "Painting", "Travel"],
  },
  {
    name: "Rohan Gupta",
    age: 26,
    bio: "Gym lover and startup enthusiast.",
    city: "Ghaziabad",
    interests: ["Fitness", "Business", "Movies"],
  },
  {
    name: "Isha Kapoor",
    age: 24,
    bio: "Books, sunsets and meaningful conversations.",
    city: "Noida",
    interests: ["Reading", "Nature", "Music"],
  },
  {
    name: "Arjun Mehta",
    age: 25,
    bio: "Exploring life one mountain at a time.",
    city: "Dehradun",
    interests: ["Hiking", "Travel", "Photography"],
  },
  {
    name: "Meera Joshi",
    age: 23,
    bio: "Dancer, foodie and a happy soul.",
    city: "Delhi",
    interests: ["Dance", "Food", "Music"],
  },
  {
    name: "Dev Patel",
    age: 27,
    bio: "Building products and chasing dreams.",
    city: "Gurgaon",
    interests: ["Startups", "Technology", "Football"],
  },
  {
    name: "Sanya Roy",
    age: 22,
    bio: "Love art galleries and spontaneous trips.",
    city: "Jaipur",
    interests: ["Art", "Travel", "Fashion"],
  },
  {
    name: "Aditya Rao",
    age: 24,
    bio: "Football, fitness and good conversations.",
    city: "Noida",
    interests: ["Football", "Fitness", "Gaming"],
  },
  {
    name: "Kiara Malhotra",
    age: 25,
    bio: "Living life with music and creativity.",
    city: "Mumbai",
    interests: ["Music", "Fashion", "Photography"],
  },
  {
    name: "Vivaan Khanna",
    age: 26,
    bio: "A techie who loves long road trips.",
    city: "Delhi",
    interests: ["Technology", "Cars", "Travel"],
  },
  {
    name: "Aditi Mishra",
    age: 23,
    bio: "Dancing through life and loving every moment.",
    city: "Lucknow",
    interests: ["Dance", "Movies", "Food"],
  },
  {
    name: "Reyansh Jain",
    age: 25,
    bio: "Entrepreneur, reader and coffee addict.",
    city: "Gurgaon",
    interests: ["Business", "Reading", "Coffee"],
  },
  {
    name: "Tara Sinha",
    age: 24,
    bio: "Nature lover and amateur photographer.",
    city: "Dehradun",
    interests: ["Nature", "Photography", "Hiking"],
  },
  {
    name: "Ishaan Kapoor",
    age: 22,
    bio: "Gaming enthusiast and movie buff.",
    city: "Delhi",
    interests: ["Gaming", "Movies", "Technology"],
  },
  {
    name: "Riya Bansal",
    age: 25,
    bio: "Finding happiness in little things.",
    city: "Noida",
    interests: ["Cooking", "Travel", "Reading"],
  },
  {
    name: "Karan Arora",
    age: 27,
    bio: "Fitness first, adventure always.",
    city: "Chandigarh",
    interests: ["Fitness", "Adventure", "Sports"],
  },
  {
    name: "Nisha Agarwal",
    age: 23,
    bio: "Designer with a love for minimalism.",
    city: "Mumbai",
    interests: ["Design", "Art", "Fashion"],
  },
  {
    name: "Siddharth Verma",
    age: 26,
    bio: "Weekend biker and full-time dreamer.",
    city: "Delhi",
    interests: ["Biking", "Travel", "Music"],
  },
  {
    name: "Pooja Nair",
    age: 24,
    bio: "Book lover and amateur chef.",
    city: "Bangalore",
    interests: ["Reading", "Cooking", "Movies"],
  },
  {
    name: "Atharv Singh",
    age: 25,
    bio: "Love football and exploring new cultures.",
    city: "Pune",
    interests: ["Football", "Travel", "Culture"],
  },
  {
    name: "Simran Kaur",
    age: 22,
    bio: "Creative soul who loves photography.",
    city: "Chandigarh",
    interests: ["Photography", "Art", "Music"],
  },
  {
    name: "Dhruv Shah",
    age: 27,
    bio: "Working in finance, living for adventures.",
    city: "Mumbai",
    interests: ["Finance", "Travel", "Fitness"],
  },
  {
    name: "Myra Das",
    age: 23,
    bio: "Music is my language.",
    city: "Kolkata",
    interests: ["Music", "Dance", "Reading"],
  },
  {
    name: "Neil Fernandes",
    age: 24,
    bio: "Beach lover and aspiring filmmaker.",
    city: "Goa",
    interests: ["Movies", "Travel", "Surfing"],
  },
  {
    name: "Sara Khan",
    age: 25,
    bio: "Always looking for the next adventure.",
    city: "Hyderabad",
    interests: ["Adventure", "Food", "Photography"],
  },
  {
    name: "Yash Thakur",
    age: 26,
    bio: "Developer by day, musician by night.",
    city: "Bangalore",
    interests: ["Technology", "Music", "Gaming"],
  },
  {
    name: "Diya Mehra",
    age: 22,
    bio: "Love sunsets, coffee and deep talks.",
    city: "Delhi",
    interests: ["Coffee", "Nature", "Reading"],
  },
  {
    name: "Manav Sethi",
    age: 25,
    bio: "Always up for a spontaneous road trip.",
    city: "Jaipur",
    interests: ["Cars", "Travel", "Photography"],
  },
  {
    name: "Zoya Ali",
    age: 24,
    bio: "Food explorer and creative thinker.",
    city: "Lucknow",
    interests: ["Food", "Art", "Travel"],
  },
];

// Avoid duplicate seeding
const existingProfiles = db
  .prepare("SELECT COUNT(*) AS count FROM profiles")
  .get();

if (existingProfiles.count > 0) {
  console.log("Profiles already seeded. Skipping...");
  db.close();
} else {
  const seedProfiles = db.transaction(() => {
    const insertProfile = db.prepare(`
      INSERT INTO profiles (
        name,
        age,
        photo,
        bio,
        city,
        interests
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertedIds = [];

    profiles.forEach((profile, index) => {
      const photo = `https://i.pravatar.cc/400?img=${index + 1}`;

      const result = insertProfile.run(
        profile.name,
        profile.age,
        photo,
        profile.bio,
        profile.city,
        JSON.stringify(profile.interests),
      );

      insertedIds.push(Number(result.lastInsertRowid));
    });

    // These profiles have already liked our logged-in user.
    // We will only reveal them if our user likes them back.
    const insertIncomingLike = db.prepare(`
      INSERT INTO incoming_likes (profile_id)
      VALUES (?)
    `);

    const incomingLikeIndexes = [1, 4, 7, 11, 16, 22];

    incomingLikeIndexes.forEach((index) => {
      insertIncomingLike.run(insertedIds[index]);
    });

    return insertedIds.length;
  });

  try {
    const total = seedProfiles();

    console.log(`${total} profiles seeded successfully`);
    console.log("6 incoming likes seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}
