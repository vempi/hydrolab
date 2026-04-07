import { Scan } from "lucide-react";
import { InformationPairing, InformationPoints } from "../components/contain-detail/information";
import Map from "../components/contain-detail/map";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/dialog";
import React from "react";
import { DataContext } from "../context-provider/data-context";
import { constantPairingStatisticalRawYearData } from "../lib/dataService";
import { parseDateTime } from "../lib/utils";
import { CustomizableBarChart, type ChartItem } from "../components/chart-component";

function buildChartData(
  years: number[],
  values: number[]
): ChartItem[] {
  if (!years || !values) return [];

  return years.map((year, index) => ({
    year,
    value: values[index] ?? 0,
  }));
}

export default function ContentDetailDataScreen() {
  const { tempMainData, tempDetailData, tempStatisticalData } = React.useContext(DataContext)

  const years = constantPairingStatisticalRawYearData
  const values = tempDetailData?.data ?? []
  const chartData = buildChartData(years, values);

  return (
    <div className="space-y-12 bg-blue-50">

      {/* titile and header */}
      <div className="bg-blue-50 md:px-8 px-6 py-24">
        <div className="flex flex-col gap-y-5 items-center">
          <h1 className="font-semibold md:max-w-175 text-center text-3xl max-w-[80vw]">
            Detail Informasi Data Stasiun Klimatologi
          </h1>
          <h2 className="md:max-w-200 max-w-[90vw] text-center text-gray-500">
            Halaman ini menampilkan informasi lengkap mengenai data curah hujan,
            periode pencatatan, lokasi stasiun, serta analisis statistik berdasarkan
            data historis yang telah dikumpulkan.
          </h2>
        </div>
      </div>
      {/* titile and header */}

      {/* main information */}
      <div className="flex xl:flex-row flex-col py-3 justify-center items-center gap-10 p-10">
        <div className="w-full xl:w-[60%] p-5 rounded-sm bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <h1 className="text-3xl py-5">{tempMainData?.Station_Name}</h1>
          <InformationPairing
            title="Data Tersedia Data"
            conten={`Jumlah yang di record sebanyak ${tempMainData?.["Data Tersedia"]?.toString() ?? "-"} data`}
          />
          <InformationPairing
            title="File Created"
            conten={`${parseDateTime(tempMainData?.File_Updated ?? "") ?? "-"}`}
          />
          <InformationPairing
            title="Periode Data Tersedia"
            conten={`Data dicatat dalam periode ${(tempMainData?.["Tahun Mulai"] ?? "-") + " s/d " + (tempMainData?.["Tahun Akhir"] ?? "-")}`}
          />
        </div>
        <div className="
            w-full xl:w-[40%]
            bg-white/80 rounded-sm
            pt-4 pb-5 px-8 space-y-2
            transition-all duration-300
            hover:shadow-lg hover:-translate-y-0.5
          ">
          <div className="w-full flex justify-end items-start">
            <Dialog>
              <DialogTrigger asChild>
                <button><Scan className="cursor-pointer" /></button>
              </DialogTrigger>
              <DialogContent className="md:max-w-[80%] max-w-[90%] min-h-125 md:p-8">
                <DialogHeader>
                  <DialogTitle>Detail Lokasi Stasiun</DialogTitle>
                  <DialogDescription>
                    Letak {tempMainData?.Station_Name} berada di {tempMainData?.LAT}, {tempMainData?.LON}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                  <div className="w-full xl:h-100 h-50">
                    <Map
                      createControll={true}
                      isStatic={false}
                      zoomLevel={12}
                      centralPoint={{ lat: tempMainData?.LAT ?? -7.940883389023307, lon: tempMainData?.LON ?? 110.37833662342864 }}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* MAP WRAPPER */}
          <div className="w-full h-80 xl:h-90 rounded-md overflow-hidden">
            <Map
              centralPoint={{ lat: tempMainData?.LAT ?? -7.940883389023307, lon: tempMainData?.LON ?? 110.37833662342864 }}
            />
          </div>
        </div>

      </div>
      {/* main information */}

      {/* additional information */}
      <div className="flex md:flex-row flex-col py-3 justify-center items-center gap-10 p-10">
        <div className="w-full p-5 rounded-sm bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <h1 className="text-3xl py-5">Informasi Statistik Data</h1>
          <p className="text-sm text-gray-500">Informasi Statistik di {tempMainData?.Station_Name}</p>
          <div className="flex w-full flex-col justify-start">
            <div className="flex w-full flex-col xl:flex-row xl:justify-start xl:items-center">
              <div className="py-5 space-y-4 w-full">
                <InformationPoints
                  title="Rata Rata Data Curah Hujan"
                  conten={`Annual Mean dari data ${tempMainData?.Annual_Mean.toString() ?? "-"}`}
                  additionalInfo="Dolor amet"
                />
                <InformationPoints
                  title="Nilai Max Data Curah Hujan"
                  conten={`Annual Max dari data ${tempMainData?.Annual_Max.toString() ?? "-"}`}
                  additionalInfo="Dolor amet"
                />
                <InformationPoints
                  title="Standar Deviasi Data"
                  conten={`Standar Deviasi Data ${tempStatisticalData?.std} dari sample sebanyak ${tempStatisticalData?.sample_size}`}
                  additionalInfo="Dolor amet"
                />
              </div>
              <div className="py-5 space-y-4 w-full">
                <InformationPoints
                  title="Probable Maximum Precipitation"
                  conten={`Annual Mean dari data ${tempStatisticalData?.pmp_evt ?? "-"}`}
                  additionalInfo="Dolor amet"
                />
                <InformationPoints
                  title="PMP metode Hershfield"
                  conten={`Annual Max dari data ${tempStatisticalData?.pmp_hers.toString() ?? "-"}`}
                  additionalInfo="Dolor amet"
                />
                <InformationPoints
                  title="PMP WMO"
                  conten={`Data yang hilang sebanyak ${tempStatisticalData?.pmp_wmo ?? "-"}`}
                  additionalInfo="Dolor amet"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* additional information */}

      {/* graohical information */}
      <div className="flex md:flex-row flex-col py-3 justify-center items-center gap-10 p-10">
        <div className="w-full p-5 rounded-sm bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
          <h1 className="text-3xl py-5">Grafik Data</h1>
          <div className="py-5 space-y-4">
            <CustomizableBarChart
              data={chartData}
              xAxisKey="year"
              bars={[
                {
                  key: "value",
                  color: "#82ca9d",
                  name: "Value"
                }
              ]}
            />
          </div>
        </div>
      </div>
      {/* graohical information */}

    </div>
  );
}
