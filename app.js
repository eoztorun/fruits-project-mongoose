//jshint esversion: 6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true}); //looks for this db, creates if doesn't exist

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please check your entry. Name is required.'] //validation
  },
  score: { //requirements for the score
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  score: 8,
  review: "Pretty solid as a fruit."
});

//fruit.save();

//create a people collection and add one person
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 7,
  review: "Not bad."
});

const strawberry = new Fruit({
  name: "Strawberry",
  score: 10,
  review: "Awesome!"
});

strawberry.save();
//pineapple.save();

const amy = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

//amy.save();

const person = new Person({
  name: "John",
  age: 37
});
//person.save();

//new fruits to add to collection
const kiwi = new Fruit({
  name: "Kiwi",
  score: 5,
  review: "Weird texture"
});

const orange = new Fruit({
  name: "Orange",
  score: 10,
  review: "Love this!"
});

const banana = new Fruit({
  name: "Banana",
  score: 10,
  review: "Best fruit ever"
});

//insert multiple documents to fruits collection
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log("Successfully saved");
//   }
// });

//read
Fruit.find(function(err, fruits) { //finds the collection
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});

//update
Fruit.updateOne({ _id: "5c70262e962b531270da614a"}, { name: "Peach"}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully updated.");
  }
});

Person.updateOne({name: "John"}, {favouriteFruit: strawberry}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("John's fav fruit updated.");
  }
});

//delete
Fruit.deleteOne( { name: "Peach" }, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully deleted.");
  }
});
