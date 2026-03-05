import React from "react";
import { DataContext, STORAGE_KEY_CONTENT_DATA, STORAGE_KEY_LAT_DATA, STORAGE_KEY_LON_DATA, STORAGE_KEY_MAIN_DATA, STORAGE_KEY_PAG_NUM } from "./data-context";
import type { DataContentInterface, DataInterface } from "../types/data-store-type";

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [pagNum, setPagNum] = React.useState<number>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_PAG_NUM);
            return stored ? Number(stored) : 0;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return 0;
        }
    });

    const [lat, setLat] = React.useState<number | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_LAT_DATA);
            return stored ? Number(stored) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    });

    const [long, setLong] = React.useState<number | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_LON_DATA);
            return stored ? Number(stored) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    });

    const [selectedData, setSelectedData] = React.useState<DataInterface | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_MAIN_DATA);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    });

    const [statisticData, setStatisticData] = React.useState<DataContentInterface | null>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY_CONTENT_DATA);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    });

    const setTempMainData = React.useCallback((data: DataInterface | null) => {
        setSelectedData(data);
        try {
            if (data === null) {
                localStorage.removeItem(STORAGE_KEY_MAIN_DATA);
            } else {
                localStorage.setItem(STORAGE_KEY_MAIN_DATA, JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, []);

    const setTempDetailData = React.useCallback((data: DataContentInterface | null) => {
        setStatisticData(data);
        try {
            if (data === null) {
                localStorage.removeItem(STORAGE_KEY_CONTENT_DATA);
            } else {
                localStorage.setItem(STORAGE_KEY_CONTENT_DATA, JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, []);

    const setSelectedLat = React.useCallback((data: number | null) => {
        setLat(data);
        try {
            if (data === null) {
                localStorage.removeItem(STORAGE_KEY_LAT_DATA);
            } else {
                localStorage.setItem(STORAGE_KEY_LAT_DATA, data.toString());
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, []);

    const setSelectedLon = React.useCallback((data: number | null) => {
        setLong(data);
        try {
            if (data === null) {
                localStorage.removeItem(STORAGE_KEY_LON_DATA);
            } else {
                localStorage.setItem(STORAGE_KEY_LON_DATA, data.toString());
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, []);

    const setPaginationNum = React.useCallback((data: number) => {
        setPagNum(data);
        try {
            if (data === null) {
                localStorage.removeItem(STORAGE_KEY_PAG_NUM);
            } else {
                localStorage.setItem(STORAGE_KEY_PAG_NUM, data.toString());
            }
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, []);

    return (
        <DataContext.Provider value={{
            selectedLat: lat,
            selectedLon: long,
            setSelectedLat: setSelectedLat,
            setSelectedLon: setSelectedLon,

            tempMainData: selectedData,
            tempDetailData: statisticData,
            setTempMainData: setTempMainData,
            setTempDetailData: setTempDetailData,

            pagNum: pagNum,
            setPagNum: setPaginationNum,

            TOTAL_PAGE: 403,
            PAGINATION_LIMIT_OFFSET: 25
        }}>
            {children}
        </DataContext.Provider>
    );
}