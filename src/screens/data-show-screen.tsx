import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../components/data-show/table";
import Pagination from "../components/data-show/pagination";
import React from "react";
import { DataContext } from "../context-provider/data-context";
import { getPaginatedData, getPairingStatisticalDataByID, searchNearest } from "../lib/dataService";
import type { DataInterface } from "../types/data-store-type";
import type { MetaDataInterface, PairingStationData } from "../assets/data/data-types";

export default function DataShowScreen() {
    const usenavigate = useNavigate();
    const { pagNum, PAGINATION_LIMIT_OFFSET, setTempMainData, setTempDetailData, setSelectedLat, setSelectedLon } = React.useContext(DataContext);
    const { data } = getPaginatedData(Math.max(pagNum, 1), PAGINATION_LIMIT_OFFSET);

    const handleSelectId = (d: DataInterface) => {
        usenavigate(`/content`);
        setTempMainData(d);
        const foundedDetailData: PairingStationData | null = getPairingStatisticalDataByID(d.Station_ID.toString());
        setTempDetailData(foundedDetailData)
    }

    const [lat, setLat] = React.useState<string>("")
    const [long, setLong] = React.useState<string>("")

    const handleSearchData = (lat: number, long: number) => {
        setSelectedLat(lat)
        setSelectedLon(long)
        const data: MetaDataInterface[] = searchNearest(lat, long)
        console.log(data)
        usenavigate(`/search`);
    }

    return (
        <div className="space-y-12">
            {/* titile and header */}
            <div className="bg-blue-50 md:px-8 px-6 py-24">
                <div className="flex flex-col gap-y-5 items-center">
                    <h1 className="font-semibold md:max-w-175 text-center text-3xl max-w-[80vw]">
                        Daftar Data Stasiun Pengamatan
                    </h1>
                    <h2 className="md:max-w-200 max-w-[90vw] text-center text-gray-500">
                        Halaman ini menampilkan daftar lengkap stasiun pengamatan beserta
                        informasi lokasi, periode pencatatan, dan metadata lainnya
                        untuk mendukung analisis data klimatologi.
                    </h2>
                </div>
            </div>
            {/* titile and header */}

            {/* table data */}
            <div className="space-y-5 md:px-24 px-12 ">
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:px-16">
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="long" className="text-sm font-semibold">Longitude</label>
                            <input value={long} type="text" name="long" id="long" className="p-2 border-gray-300 rounded-md border" onChange={(e) => setLong(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="lat" className="text-sm font-semibold">Latitude</label>
                            <input value={lat} type="text" name="lat" id="lat" className="p-2 border-gray-300 rounded-md border" onChange={(e) => setLat(e.target.value)} />
                        </div>
                        <div className="flex items-end justify-end">
                            <button onClick={() => {
                                handleSearchData(parseFloat(lat), parseFloat(long));
                            }} className="p-2.5 bg-blue-500 text-white w-full rounded-md cursor-pointer hover:bg-blue-600 text-sm">Cari (500m)</button>
                        </div>
                    </div>
                    <div className="p-4 rounded-md border border-gray-200">
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
                                {data.map((d, idx) => (
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
                <Pagination />
            </div>
            {/* table data */}

        </div>
    );
}
