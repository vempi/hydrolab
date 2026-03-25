import React from "react";
import { DataContext } from "../context-provider/data-context";
import type { MetaDataInterface, PairingStationData } from "../assets/data/data-types";
import { getPairingStatisticalDataByID, searchNearest } from "../lib/dataService";
import SearchMap from "../components/contain-detail/search-map";

import { useNavigate } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../components/data-show/table";
import type { DataInterface } from "../types/data-store-type";

export default function SearchScreen() {
    const { selectedLon, selectedLat, setTempMainData, setTempDetailData, } = React.useContext(DataContext);

    const [lat, setLat] = React.useState<string>(selectedLat?.toString() ?? "");
    const [long, setLong] = React.useState<string>(selectedLon?.toString() ?? "");
    const [range, setRange] = React.useState<string>("500");

    const [searchData, setSearchData] = React.useState<MetaDataInterface[]>([]);

    const usenavigate = useNavigate();

    const handleSelectId = async (d: DataInterface) => {
        usenavigate(`/content`);
        setTempMainData(d);
        const foundedDetailData: PairingStationData | null = await getPairingStatisticalDataByID(d.Station_ID.toString());
        setTempDetailData(foundedDetailData);
    }

    async function handleSearch() {
        if (!lat || !long || !range) {
            return;
        }

        const parsedLat = parseFloat(lat);
        const parsedLong = parseFloat(long);
        const parsedRange = parseFloat(range);

        if (isNaN(parsedLat) || isNaN(parsedLong) || isNaN(parsedRange)) {
            return;
        }

        const data: MetaDataInterface[] = await searchNearest(parsedLat, parsedLong, parsedRange / 1000);
        setSearchData(data);
        console.log("Search center:", parsedLat, parsedLong, parsedRange / 1000);
    }

    if (
        !lat || !long ||
        lat === "" || long === "" ||
        lat === null || long === null ||
        lat === "NaN" || long === "NaN"
    ) {
        setLat("-7.940883389023307");
        setLong("110.37833662342864");
    }

    const MIN_ZOOM = 10
    const MAX_ZOOM = 25

    const r = Math.max(1, parseFloat(range)) // hindari log(0)

    const zoomLevel = Math.max(
        MIN_ZOOM,
        Math.min(
            MAX_ZOOM,
            Math.round(18 - Math.log10(r) * 2)
        )
    )

    return (
        <div className="space-y-8 bg-blue-50 pb-12">

            {/* Title */}
            <div className="md:px-8 px-6 pt-12">
                <div className="flex flex-col gap-y-5 items-center">
                    <h1 className="font-semibold text-center text-3xl max-w-[80vw]">
                        Pencarian Stasiun Berdasarkan Lokasi
                    </h1>

                    <h2 className="max-w-[90vw] text-center text-gray-500">
                        Cari dan temukan stasiun pengamatan terdekat berdasarkan
                        koordinat latitude, longitude, dan radius pencarian yang ditentukan.
                    </h2>
                </div>
            </div>

            {/* Form */}
            <div className="w-full flex justify-center">
                <div className="w-[70%] bg-white p-6 rounded-lg shadow-md">
                    <div className="grid md:grid-cols-4 gap-4">

                        {/* Latitude */}
                        <div>
                            <label className="text-sm font-medium">Latitude</label>
                            <input
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            />
                        </div>

                        {/* Longitude */}
                        <div>
                            <label className="text-sm font-medium">Longitude</label>
                            <input
                                value={long}
                                onChange={(e) => setLong(e.target.value)}
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            />
                        </div>

                        {/* Range */}
                        <div>
                            <label className="text-sm font-medium">Range (meter)</label>
                            <input
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                                placeholder="max range: 10000 (for now)"
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            />
                        </div>

                        {/* Button */}
                        <div className="flex items-end">
                            <button
                                onClick={() => handleSearch()}
                                className="p-2.5 bg-blue-500 text-white w-full rounded-md cursor-pointer hover:bg-blue-600 text-sm"
                            >
                                Show
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="w-full flex justify-center">
                <div className="w-[70%] xl:h-120 h-80">

                    <SearchMap
                        isStatic={false}
                        createControll={true}
                        centralPoint={{ lat: parseFloat(lat), lon: parseFloat(long) }}
                        range={parseFloat(range) / 1000}
                        showedStation={searchData}
                        zoomLevel={zoomLevel}
                    />
                </div>
            </div>

            <div className="w-full flex justify-center px-20 py-8">
                <div className="w-full p-4 rounded-md border border-gray-200 bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">Statition ID</TableHead>
                                <TableHead className="text-center w-32">Station Name</TableHead>
                                <TableHead className="text-center w-24">File Created</TableHead>
                                <TableHead className="text-center w-28">Years Covered</TableHead>
                                <TableHead className="text-center w-24">Elevation</TableHead>
                                <TableHead className="text-center w-28">Latitude</TableHead>
                                <TableHead className="text-center w-28">Longitude</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {searchData.map((d, idx) => (
                                <TableRow key={idx}>
                                    <TableCell onClick={() => handleSelectId(d)} className="w-10 text-sm text-center hover:underline cursor-pointer">{d.Station_ID}</TableCell>
                                    <TableCell className="text-start w-24 text-sm">{d.Station_Name}</TableCell>
                                    <TableCell className="text-center w-28 text-sm">{d.File_Created}</TableCell>
                                    <TableCell className="text-center w-28 text-sm">{d.Years_Covered}</TableCell>
                                    <TableCell className="text-center w-24 text-sm">{d.Elevation}</TableCell>
                                    <TableCell className="text-center w-28 text-sm">{d.latitude}</TableCell>
                                    <TableCell className="text-center w-28 text-sm">{d.longitude}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
