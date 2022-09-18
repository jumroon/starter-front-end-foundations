import axios from "axios";

const contributorCount = (repositories, contributorsList) => {
  let repositoryContributorCount = [];
  for (let i = 0; i < repositories.length; i++) {
    repositoryContributorCount.push({
      name: repositories[i].name,
      numberOfContributors: contributorsList[i].length,
    });
  }
  return repositoryContributorCount;
};

const getRepoContributors = async (repo) => {
  const contributorsReponse = await axios.get(repo.contributors_url);
  return contributorsReponse.data;
};

const getAllRepos = (repos) => {
  const newRepos = repos.slice(0, 5);
  return Promise.all(newRepos.map(getRepoContributors)).then((contributors) => {
    return contributorCount(newRepos, contributors);
  });
};

function listRepoContributorCounts() {
  return axios
    .get("https://api.github.com/orgs/wesabe/repos")
    .then((response) => response.data)
    .then(getAllRepos)
    .then((repositoryContributorCounts) => {
      return repositoryContributorCounts;
    })
    .catch((error) => {
      return error;
    });
}

// const result = await listRepoContributorCounts();
// console.log(result);

async function getRates(rates) {
  try {
    const url = `https://api.frankfurter.app/latest?from=${rates}`;
    const response = await axios.get(url);
    return response.data.rates;
  } catch (error) {
    console.log(error.message);
  }
}

const result = await getRates("USD");
console.log(result);
