import csv
import json
import math
import os

data_dir = os.path.join(os.path.dirname(__file__), "../public/data")

# --- 1. Parse CSV ---
stations = []
with open(os.path.join(data_dir, "station_metadata_FINAL.csv"), encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader, start=2):
        if not row["Tahun Mulai"].strip() or not row["LAT"].strip() or not row["LON"].strip():
            print(f"  ⚠ Skipping row {i} (empty required field): {row.get('Station_Name', '').strip()}")
            continue

        start_year = int(row["Tahun Mulai"])
        end_year = int(row["Tahun Akhir"])
        lat = float(row["LAT"])
        lon = float(row["LON"])

        stations.append({
            "Station_ID": int(row["Station_ID"]),
            "Station_Name": row["Station_Name"].strip(),
            "Elevation": float(row["Elevation"]),
            "File_Created": row["File_Updated"].strip(),
            "Data_Points": int(row["Data Tersedia"]),
            "Years_Covered": f"{start_year}-{end_year}",
            "Records": int(row["Data Tersedia"]),
            "Start_Year": start_year,
            "End_Year": end_year,
            "Annual_Mean": float(row["Annual_Mean"]),
            "Annual_Max": float(row["Annual_Max"]),
            "Missing_Values": int(row["Data Hilang"]),
            "LAT": lat,
            "LON": lon,
            "latitude": lat,
            "longitude": lon,
        })

# --- 2. Write all-data.json ---
with open(os.path.join(data_dir, "all-data-new.json"), "w", encoding="utf-8") as f:
    json.dump(stations, f, indent=4, ensure_ascii=False)
print(f"✓ all-data-new.json written ({len(stations)} stations)")

# --- 3. Generate splited-data.json using grid ---
with open(os.path.join(data_dir, "info-grid.json"), encoding="utf-8") as f:
    grid = json.load(f)

splited_data = {}
skipped = 0

for station in stations:
    row = math.floor((station["latitude"] - grid["lat_start"]) / grid["lat_step"])
    col = math.floor((station["longitude"] - grid["lon_start"]) / grid["lon_step"])

    if row < 0 or row >= grid["lat_count"] or col < 0 or col >= grid["lon_count"]:
        skipped += 1
        continue

    area_id = f"Area_{row * grid['lon_count'] + col + 1}"
    splited_data.setdefault(area_id, []).append(station)

with open(os.path.join(data_dir, "splited-data-new.json"), "w", encoding="utf-8") as f:
    json.dump(splited_data, f, indent=4, ensure_ascii=False)
print(f"✓ splited-data-new.json written ({len(splited_data)} areas, {skipped} stations skipped out-of-grid)")
