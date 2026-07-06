// TypeScript adds basic types to JavaScript exercise

let studentName: string = "Yunchong";
let age: number = 23;
let isInternational: boolean = true;

console.log(studentName, age, isInternational);

// Function
function describeStudent(name: string, city: string, budget: number): string {
  return `${name} is looking for housing in ${city} with a budget of ${budget} euros.`;
}

console.log(describeStudent("Yunchong", "Paris", 900));

// alias student profile
type StudentProfile = {
  name: string;
  city: string;
  budget: number;
  isInternational: boolean;
};

const student: StudentProfile = {
  name: "Yunchong",
  city: "Paris",
  budget: 900,
  isInternational: true,
};

console.log(student);

// alias housing listing
type HousingListing = {
  title: string;
  city: string;
  rent: number;
  verified: boolean;
};

const listings: HousingListing[] = [
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
    rent: 900,
    verified: true,
  },
];

function filterVerifiedListings(listings: HousingListing[]): HousingListing[] {
  return listings.filter((listing) => listing.verified);
}

console.log(filterVerifiedListings(listings));