export interface MetaDataInterface {
  Station_ID: number;
  Station_Name: string;
  Elevation: number;
  File_Updated: string;
  Data_Points: number;
  Years_Covered: string;
  "Data Tersedia"?: number;
  "Tahun Mulai"?: number;
  "Tahun Akhir"?: number;
  Annual_Mean: number;
  Annual_Max: number;
  "Data Hilang"?: number;
  LAT: number;
  LON: number;
  latitude: number;
  longitude: number;
}

export interface StatisticalData {
  Station_ID: number;
  _id: string;
  max: number;
  mean: number;
  median: number;
  min: number;
  pmp_evt: number;
  pmp_hers: number;
  pmp_wmo: number;
  sample_size: number;
  std: number;
}

export interface PairingStationData {
  station_name: string;
  data: number[];
}

export interface PairingDataContentInterface {
  [id: string]: PairingStationData;
}

export interface PairingDataRAWInterface {
  year: number[];
  content: PairingDataContentInterface;
}

export interface GridMeta {
  lat_start: number;
  lon_start: number;
  lat_step: number;
  lon_step: number;
  lat_count: number;
  lon_count: number;
}

export interface AllDataInterface {
  data: MetaDataInterface[];
}
