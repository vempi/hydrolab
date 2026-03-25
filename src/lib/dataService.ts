import type {
  MetaDataInterface,
  PairingStationData,
} from "../assets/data/data-types";

const BASE_URL = "https://hydrolab-backend-system.vercel.app";

// Cache for pairing years — populated on first pairing fetch
let cachedYears: number[] = [];

export async function getPaginatedData(
  page: number,
  limit: number,
): Promise<{
  data: MetaDataInterface[];
  total: number;
  totalPages: number;
}> {
  const res = await fetch(`${BASE_URL}/data/paginated?page=${page}&limit=${limit}`);
  return res.json();
}

export async function getDataById(
  id: number | string,
): Promise<MetaDataInterface | null> {
  const res = await fetch(`${BASE_URL}/data/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function searchNearest(
  lat: number,
  lon: number,
  radiusKm = 1,
): Promise<MetaDataInterface[]> {
  const res = await fetch(`${BASE_URL}/search?lat=${lat}&lon=${lon}&radius=${radiusKm}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getPairingStatisticalDataByID(
  id: string,
): Promise<PairingStationData | null> {
  const res = await fetch(`${BASE_URL}/pairing/${id}`);
  if (!res.ok) return null;
  const json = await res.json();

  // Cache years if the response includes them
  if (json?.year && Array.isArray(json.year)) {
    cachedYears = json.year;
    return json.content?.[id] ?? json;
  }

  return json;
}

export function constantPairingStatisticalRawYearData(): number[] {
  return cachedYears;
}
