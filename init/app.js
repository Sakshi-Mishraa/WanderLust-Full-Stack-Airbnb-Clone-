//setting our database
const mongoose=require("mongoose")
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
  }
  main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//COLLECTION REQUIRED FROM listing.js
const User=require("../models/user.js")
//ARRAY OF OBJECT (SAMPLE users) REQUIRED FROM data.js to be saved into User model
const {users}=require("./data.js")
//function to initialize User model with 10 sample users.
const initUsers=async()=>{
  await User.deleteMany({});//deleting  the databse before initializing
  //using register method of mongoose-local package to initialize user model 
  for (let userData of users) {
    const { username, email, password } = userData;//deconstructing object extracted from array users 
    const user = new User({ username, email });
    await User.register(user, password);
  }
  console.log("Users seeded successfully!");
}

//COLLECTION REQUIRED FROM listing.js
const Listing=require("../models/listing.js")
//ARRAY OF OBJECT (SAMPLE DATA) REQUIRED FROM data.js
const { sampleListings }=require("./data.js")
//initializing database by arrow function which when called will first clean the collection and then insert documents into it.
//function to initialize Listing model with 29 listings each with owner property 
const initListings = async () => {
  await Listing.deleteMany({});//deleting  the databse before initializing
  //since we have 10 users and 29 listings so multiple listing will have same user as users are less and listings are more . so we will first extract users from user model and then generate the random users from list of users 
  const users = await User.find(); // Get all registered users in the form of array of objects 
  sampleListings.forEach((listing) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];// since users is array of objects where each object is representing a user so we will extract a single user as user[index] and index will be randomly generated using Math.random() function 
      if (randomUser) {
        listing.owner = randomUser._id;
    } else {
        console.log("Random user not found for listing:",listing);
    }
    });
  await Listing.insertMany(sampleListings);//inserting after deleting the data
  console.log("Listing seeded successfully");
};
// calling arrow function 
// initListings();

//OR

async function saveDB(){
  await initUsers();
  await initListings();
}

saveDB();