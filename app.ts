import * as readline from "readline-sync";
import importedNetworks from "./networks.json";
import importedSeries from "./series.json";
import { Network } from "./types";
import { Serie } from "./types";

/*async function GetNetworkData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/maddieagnolo/data/refs/heads/main/networks.json"
    );
    const data: Network[] = await response.json();
  } catch (error: any) {
    return error;
  }
}
async function GetSeriesData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/maddieagnolo/data/refs/heads/main/series.json"
    );
    const data: Serie[] = await response.json();
  } catch (error: any) {
    return error;
  }
}
async function main() {
  const networks: Network[] = await GetNetworkData();
  const series: Serie[] = await GetSeriesData();
}
*/

const networks: Network[] = importedNetworks;
const series: Serie[] = importedSeries;

console.log(`Welcome to the JSON data viewer!`);
const menuItems: string[] = [
  "View all series",
  "Find a series by ID",
  "Browse series by genre",
  "Search by age ",
  "Browse series by language",
];

let continueMenu: boolean = true;
while (continueMenu) {
  const choice = readline.keyInSelect(menuItems);
  if (choice === -1) {
    continueMenu = false;
  } else {
    switch (choice) {
      case 0:
        console.clear();
        ShowAllSeries();
        break;

      case 1:
        console.clear();
        SearchById();
        break;

      case 2:
        console.clear();
        searchByGenre();
        break;

      case 3:
        console.clear();
        searchByAge();
        break;

      case 4:
        console.clear();
        searchByLanguage();
        break;
    }
  }
}
function ShowAllSeries() {
  console.log(`All available series: `);
  const allSeries = series.map((series) => `\t - ${series.name}`).join("\n");
  console.log(allSeries);
}

function SearchById() {
  const searchedSerie = readline.question("Enter the series ID: ");

  const serieById = series.filter((el) => el.id == searchedSerie);

  console.log(serieById);
}

function searchByGenre() {
  const getgenres: string[][] = series.map((el) => el.genres);
  let allGenres = getgenres.reduce((a, e) => {
    e.forEach((e) => (!a.includes(e) ? a.push(e) : ""));
    return a;
  }, []);
  const choice = readline.keyInSelect(allGenres, "Pick a genre to explore ");
  console.log(`You selected: ${allGenres[choice]} `);
  const listFilteredSeries: Serie[] = [];
  const filterSeries = series.filter((el) =>
    el.genres.includes(allGenres[choice]) ? listFilteredSeries.push(el) : []
  );
  const getTitles: string = listFilteredSeries
    .map((el) => ` \t -  ${el.name}`)
    .join("\n");
  console.log(
    `Here are all series in the ${allGenres[choice]} genre: \n${getTitles}`
  );
}

function searchByAge() {
  const ages = ["All ages", "12+", "16+", "18+"];
  const minAge = readline.keyInSelect(ages, "Choose an age rating: ");
  console.log(`You selected: ${ages[minAge]} `);
  if (minAge === 0) {
    console.log(series.map((el) => ` \t -  ${el.name}`).join("\n"));
  } else {
    const seriesByAge = series.filter(
      (el) => el.minAge >= parseInt(ages[minAge].substring(0, 2))
    );
    const namesSeries = seriesByAge.map((el) => `\t -  ${el.name}`).join("\n");
    console.log(namesSeries);
  }
}

function searchByLanguage() {
  const languages = ["English", "Korean", "Japanese"];
  const answer = readline.keyInSelect(
    languages,
    "Pick a language to explore: "
  );
  console.log(`You selected: ${languages[answer]}`);
  console.log(`Here are all series available in ${languages[answer]}`);

  const seriesByLanguage: Serie[] = series.filter(
    (el) => el.language === languages[answer]
  );
  console.log(seriesByLanguage.map((el) => ` \t -  ${el.name}`).join("\n"));
}
