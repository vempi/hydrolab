import grids from "../assets/data/info-grid.json";
import allDataRaw from "../assets/data/all-data.json";
import splitedData from "../assets/data/splited-data.json";
import pairingStatisticalData from "../assets/data/pairingdata.json";

import type {
  MetaDataInterface,
  GridMeta,
  PairingDataRAWInterface,
  PairingStationData,
} from "../assets/data/data-types";

const allData: MetaDataInterface[] = allDataRaw as MetaDataInterface[];

export function getAllData(): MetaDataInterface[] {
  return allData;
}

export function getPaginatedData(
  page: number,
  limit: number,
): {
  data: MetaDataInterface[];
  total: number;
  totalPages: number;
} {
  const total = allData.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const data = allData.slice(start, end);

  return {
    data,
    total,
    totalPages,
  };
}

export function getDataById(id: number | string): MetaDataInterface | null {
  return allData.find((item) => item.Station_ID === id) || null;
}

const gridMeta = grids as GridMeta;

export function getCellIndex(lat: number, lon: number) {
  const row = Math.floor((lat - gridMeta.lat_start) / gridMeta.lat_step);

  const col = Math.floor((lon - gridMeta.lon_start) / gridMeta.lon_step);

  return { row, col };
}

export function getAreaId(lat: number, lon: number): string | null {
  const { row, col } = getCellIndex(lat, lon);

  if (
    row < 0 ||
    row >= gridMeta.lat_count ||
    col < 0 ||
    col >= gridMeta.lon_count
  ) {
    return null;
  }

  const areaId = row * gridMeta.lon_count + col + 1;

  return `Area_${areaId}`;
}

export function getNeighborAreas(
  lat: number,
  lon: number,
  radius = 1,
): string[] {
  const { row, col } = getCellIndex(lat, lon);

  const result: string[] = [];

  for (let dr = -radius; dr <= radius; dr++) {
    for (let dc = -radius; dc <= radius; dc++) {
      const r = row + dr;
      const c = col + dc;

      if (
        r >= 0 &&
        r < gridMeta.lat_count &&
        c >= 0 &&
        c < gridMeta.lon_count
      ) {
        const id = r * gridMeta.lon_count + c + 1;

        result.push(`Area_${id}`);
      }
    }
  }

  return result;
}

export function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

export function searchNearest(
  lat: number,
  lon: number,
  radiusKm = 1,
  // limit = 20,
): MetaDataInterface[] {

  const CELL_LAT_KM = 10;
  const CELL_LON_KM = 5;

  // ambil radius maksimum
  const cellRadiusLat = Math.ceil(radiusKm / CELL_LAT_KM);
  const cellRadiusLon = Math.ceil(radiusKm / CELL_LON_KM);

  const cellRadius = Math.max(cellRadiusLat, cellRadiusLon);

  const areas = getNeighborAreas(lat, lon, cellRadius);

  let candidates: MetaDataInterface[] = [];

  for (const area of areas) {
    const data =
      (splitedData as Record<string, MetaDataInterface[]>)[area] || [];

    candidates = candidates.concat(data);
  }

  return candidates
    .map(item => ({
      ...item,
      distance: haversine(lat, lon, item.latitude, item.longitude),
    }))
    .filter(item => item.distance <= radiusKm) // FILTER PENTING
    .sort((a, b) => a.distance - b.distance);
    // .slice(0, limit);
}


const pairingStatisticalRawData: PairingDataRAWInterface =
  pairingStatisticalData as PairingDataRAWInterface;

export const constantPairingStatisticalRawYearData =
  pairingStatisticalRawData.year;

export const constantPairingStatisticalRawContentData =
  pairingStatisticalRawData.content;

export function getPairingStatisticalDataByID(
  id: string,
): PairingStationData | null {
  return constantPairingStatisticalRawContentData[id] || null;
}
