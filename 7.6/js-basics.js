// Exercise: basic JavaScript syntax.

const studentName = "Yunchong";
let city = "Paris";
let budget = 900;

// debugging output
console.log("Student:", studentName);
console.log("City:", city);
console.log("Budget:", budget);

// Function Application
function describeStudent(name, city, budget) {
  return `${name} is looking for housing in ${city} with a budget of ${budget} euros.`;
}

console.log(describeStudent(studentName, city, budget));

// Object example
const studentProfile = {
  name: "Yunchong",
  city: "Paris",
  budget: 900,
  isInternational: true,
};

console.log(studentProfile);

// Array of objects
const listings = [
  {
    title: "Studio near campus",
    city: "Paris",
    rent: 950,
    verified: true,
  },
  {
    title: "Shared apartment",
    city: "Nanterre",
    rent: 750,
    verified: false,
  },
  {
    title: "Student residence",
    city: "Paris",
    rent: 680,
    verified: true,
  },
];

// Filter verified listings
const verifiedListings = listings.filter(function (listing) {
  return listing.verified === true;
});

console.log("Verified listings:", verifiedListings);

// Filter listings by budget
const affordableListings = listings.filter(function (listing) {
  return listing.rent <= budget;
});

console.log("Affordable listings:", affordableListings);