import { Scan, Target } from "lucide-react";
import Map from "./map";

export function InformationPairing({
  title,
  conten,
}: {
  title: string;
  conten: string;
}) {
  return (
    <div className="grid md:grid-cols-5 grid-cols-1 gap-3 items-start p-4 border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
      <h2 className="font-medium text-sm">{title}</h2>
      <p className="text-sm col-span-4 text-gray-600 flex">
        <span className="mr-1 hidden md:flex">:</span>
        {conten}
      </p>
    </div>
  );
}

export function InformationPoints({
  title,
  conten,
  additionalInfo,
}: {
  title: string;
  conten: string;
  additionalInfo: string;
}) {
  return (
    <div className="w-full flex items-start justify-between gap-5 p-3 rounded-md hover:bg-gray-50 transition">
      <div className="w-full flex items-start gap-3">
        <Target className="mt-1 text-gray-500 hidden md:block" size={18} />
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-[12px] text-gray-600">{conten}</p>
        </div>
      </div>
      <div className="text-xs text-gray-500 whitespace-nowrap hidden">
        {additionalInfo}
      </div>
    </div>
  );
}

export function MainInformation() {
  return (
    <div className="flex md:flex-row flex-col py-3 justify-center items-center gap-10 p-10">
      <div className="w-full md:w-[60%] p-5 rounded-sm bg-white">
        <h1 className="text-3xl py-5">Information Title</h1>
        <InformationPairing
          title="Aliqua ipsum"
          conten="Dolor duis fugiat reprehenderit et dolor aliquip ullamco occaecat eu pariatur minim cillum."
        />
        <InformationPairing
          title="Aliqua ipsum"
          conten="Dolor duis fugiat reprehenderit et dolor aliquip ullamco occaecat eu pariatur minim cillum."
        />
        <InformationPairing
          title="Aliqua ipsum"
          conten="Dolor duis fugiat reprehenderit et dolor aliquip ullamco occaecat eu pariatur minim cillum."
        />
      </div>
      <div className="w-full md:w-[40%] aspect-9/6 bg-white/80 rounded-sm pt-4 pb-5 px-8 space-y-2">
        <div className="w-full flex justify-end items-start">
          <Scan className="cursor-pointer" />
        </div>
        <Map />
      </div>
    </div>
  )
}

export function InformationComplementary({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full px-4 py-2">
      <h1 className="text-sm py-1">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}