import { createContext } from "react";
import type { DataContentInterface, DataInterface } from "../types/data-store-type";

export const STORAGE_KEY_MAIN_DATA = "main-data";
export const STORAGE_KEY_CONTENT_DATA = "content-data";
export const STORAGE_KEY_LAT_DATA = "lat-data";
export const STORAGE_KEY_LON_DATA = "lon-data";
export const STORAGE_KEY_PAG_NUM = "pag-num";

export type DataContextType = {
    selectedLat: number | null;
    setSelectedLat: (d: number | null) => void;

    selectedLon: number | null;
    setSelectedLon: (d: number | null) => void;

    tempMainData: DataInterface | null;
    tempDetailData: DataContentInterface | null;
    setTempMainData: (d: DataInterface | null) => void;
    setTempDetailData: (d: DataContentInterface | null) => void;

    pagNum: number;
    setPagNum: (d: number) => void;

    TOTAL_PAGE: number | 600;
    PAGINATION_LIMIT_OFFSET: number | 25;
}

export const DataContext = createContext<DataContextType>({
    selectedLat: null,
    setSelectedLat: () => {},
    selectedLon: null,
    setSelectedLon: () => {},

    tempMainData: null,
    tempDetailData: null,
    setTempMainData: () => {},
    setTempDetailData: () => {},

    pagNum: 1,
    setPagNum: () => {},

    TOTAL_PAGE: 403,
    PAGINATION_LIMIT_OFFSET: 25
})