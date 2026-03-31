import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../public/data");

// --- 1. Parse CSV ---
const csvText = fs.readFileSync(path.join(dataDir, "station_metadata_FINAL.csv"), "utf-8");
const lines = csvText.trim().split("\n");
const headers = lines[0].split(",");

const stations = lines.slice(1).map((line) => {
  const values = line.split(",");
  const get = (key) => values[headers.indexOf(key)]?.trim() ?? "";

  const startYear = parseInt(get("Tahun Mulai"));
  const endYear = parseInt(get("Tahun Akhir"));
  const lat = parseFloat(get("LAT"));
  const lon = parseFloat(get("LON"));

  return {
    Station_ID: parseInt(get("Station_ID")),
    Station_Name: get("Station_Name"),
    Elevation: parseFloat(get("Elevation")),
    File_Created: get("File_Updated"),
    Data_Points: parseInt(get("Data Tersedia")),
    Years_Covered: `${startYear}-${endYear}`,
    Records: parseInt(get("Data Tersedia")),
    Start_Year: startYear,
    End_Year: endYear,
    Annual_Mean: parseFloat(get("Annual_Mean")),
    Annual_Max: parseFloat(get("Annual_Max")),
    Missing_Values: parseInt(get("Data Hilang")),
    LAT: lat,
    LON: lon,
    latitude: lat,
    longitude: lon,
  };
});

// --- 2. Write all-data.json ---
fs.writeFileSync(
  path.join(dataDir, "all-data.json"),
  JSON.stringify(stations, null, 4)
);
console.log(`✓ all-data.json written (${stations.length} stations)`);

// --- 3. Generate splited-data.json using grid ---
const grid = JSON.parse(fs.readFileSync(path.join(dataDir, "info-grid.json"), "utf-8"));

const splitedData = {};

for (const station of stations) {
  const row = Math.floor((station.latitude - grid.lat_start) / grid.lat_step);
  const col = Math.floor((station.longitude - grid.lon_start) / grid.lon_step);

  if (
    row < 0 || row >= grid.lat_count ||
    col < 0 || col >= grid.lon_count
  ) {
    continue; // skip out-of-grid stations
  }

  const areaId = `Area_${row * grid.lon_count + col + 1}`;

  if (!splitedData[areaId]) splitedData[areaId] = [];
  splitedData[areaId].push(station);
}

fs.writeFileSync(
  path.join(dataDir, "splited-data.json"),
  JSON.stringify(splitedData, null, 4)
);
console.log(`✓ splited-data.json written (${Object.keys(splitedData).length} areas)`);
