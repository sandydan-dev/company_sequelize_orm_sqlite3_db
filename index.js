const express = require("express");
const app = express();
const port = 3000;

const { sequelize } = require("./lib/index");
const company = require("./models/company.model");

const companiesData = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    foundedYear: 2005,
    headquarter: "San Francisco",
    revenue: 1000000000,
  },
  {
    id: 2,
    name: "GreenEnergy",
    industry: "Renewable Energy",
    foundedYear: 2010,
    headquarter: "Berlin",
    revenue: 500000000,
  },
  {
    id: 3,
    name: "SmartHome",
    industry: "Consumer Electronics",
    foundedYear: 2015,
    headquarter: "Tokyo",
    revenue: 2000000000,
  },
  {
    id: 4,
    name: "EcoFriendly",
    industry: "Environmental Services",
    foundedYear: 2008,
    headquarter: "Paris",
    revenue: 300000000,
  },
  {
    id: 5,
    name: "CyberSec",
    industry: "Information Security",
    foundedYear: 2012,
    headquarter: "London",
    revenue: 1500000000,
  },
  {
    id: 6,
    name: "BioTech",
    industry: "Biotechnology",
    foundedYear: 2009,
    headquarter: "Boston",
    revenue: 800000000,
  },
  {
    id: 7,
    name: "CleanTech",
    industry: "Clean Technology",
    foundedYear: 2011,
    headquarter: "Zurich",
    revenue: 400000000,
  },
  {
    id: 8,
    name: "QuantumAI",
    industry: "Artificial Intelligence",
    foundedYear: 2016,
    headquarter: "New York",
    revenue: 1200000000,
  },
  {
    id: 9,
    name: "SustainableAg",
    industry: "Sustainable Agriculture",
    foundedYear: 2007,
    headquarter: "Sydney",
    revenue: 600000000,
  },
  {
    id: 10,
    name: "GreenBuild",
    industry: "Sustainable Construction",
    foundedYear: 2013,
    headquarter: "Dubai",
    revenue: 900000000,
  },
  {
    id: 11,
    name: "EcoMobility",
    industry: "Electric Vehicles",
    foundedYear: 2014,
    headquarter: "Stockholm",
    revenue: 700000000,
  },
  {
    id: 12,
    name: "ClimateTech",
    industry: "Weather Technology",
    foundedYear: 2006,
    headquarter: "Singapore",
    revenue: 1100000000,
  },
  {
    id: 13,
    name: "CircularEcon",
    industry: "Circular Economy",
    foundedYear: 2017,
    headquarter: "Helsinki",
    revenue: 950000000,
  },
  {
    id: 14,
    name: "NetZero",
    industry: "Carbon Neutrality",
    foundedYear: 2018,
    headquarter: "Beijing",
    revenue: 1300000000,
  },
  {
    id: 15,
    name: "SustainTech",
    industry: "Sustainable Technologies",
    foundedYear: 2003,
    headquarter: "Toronto",
    revenue: 1000000000,
  },
  {
    id: 16,
    name: "EcoInnovate",
    industry: "Environmental Innovation",
    foundedYear: 2019,
    headquarter: "Oslo",
    revenue: 1200000000,
  },
  {
    id: 17,
    name: "GreenFin",
    industry: "Sustainable Finance",
    foundedYear: 2010,
    headquarter: "Frankfurt",
    revenue: 900000000,
  },
  {
    id: 18,
    name: "ClimateAdapt",
    industry: "Climate Adaptation",
    foundedYear: 2009,
    headquarter: "Amsterdam",
    revenue: 1100000000,
  },
  {
    id: 19,
    name: "SustainCities",
    industry: "Urban Sustainability",
    foundedYear: 2015,
    headquarter: "Mumbai",
    revenue: 1300000000,
  },
  {
    id: 20,
    name: "EcoIndustries",
    industry: "Sustainable Manufacturing",
    foundedYear: 2004,
    headquarter: "Vienna",
    revenue: 1500000000,
  },
];

app.get("/seed_company_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(companiesData);
    res.send("Company Database seeded successfully");
  } catch (error) {
    res.status(500).json({ message: "Error creating company dtabase", error });
  }
});

// get all company data
async function getAllCompanyData() {
  let query = await company.findAll();
  if (!query) {
    throw new Error("Error fetching company data");
  } else {
    return { company: query };
  }
}
app.get("/company", async (req, res) => {
  try {
    let result = await getAllCompanyData();
    if (!result) {
      res.status(404).json({ message: "Error getting company data" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// find company by given id
async function findCompanyDetailsById(id) {
  let query = await company.findOne({ where: { id } });
  if (!query) {
    return null;
  } else {
    return { company: query };
  }
}
app.get("/company/details/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await findCompanyDetailsById(id);

    if (!result) {
      res.status(404).json({ message: "Company not found by this id" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// find company by given revenue and order by given value
async function findCompanyHeadQuarter(headquarter) {
  let query = await company.findAll({
    where: { headquarter },
  });
  if (!query) {
    return null;
  } else {
    return { company: query };
  }
}
app.get("/company/headquarter/:headquarter", async (req, res) => {
  try {
    let headquarter = req.params.headquarter;
    // let order = req.query.order;

    let result = await findCompanyHeadQuarter(headquarter);

    if (!result) {
      res.status(404).json({ message: "Company revenue not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listning icomming requests for a company
app.listen(port, () => {
  console.log(`Server is running at${port}`);
});
