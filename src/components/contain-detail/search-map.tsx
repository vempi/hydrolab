/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import circle from "@turf/circle";
import type { Feature, Polygon } from "geojson";
import type { MetaDataInterface } from "../../assets/data/data-types";

interface Props {
    createControll?: boolean;
    isStatic?: boolean;
    zoomLevel?: number;
    centralPoint?: {
        lon: number;
        lat: number;
    };
    range?: number;
    showedStation?: MetaDataInterface[];
}

export default function SearchMap({
    createControll = false,
    isStatic = true,
    zoomLevel = 8,
    centralPoint = {
        lon: 110.37833662342864,
        lat: -7.940883389023307,
    },
    range = 1000,
    showedStation = [],
}: Props) {
    const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<maplibregl.Map | null>(null);
    const markersRef = React.useRef<maplibregl.Marker[]>([]);

    const center = React.useMemo<[number, number]>(() => [
        centralPoint.lon,
        centralPoint.lat,
    ], [centralPoint.lon, centralPoint.lat]);

    const radius = range;
    const options = { steps: 64, units: "kilometers" as const };

    const circleData: Feature<Polygon> = React.useMemo(() => {
        return circle(center, radius, options);
    }, [center, radius]);

    React.useEffect(() => {
        if (!mapContainerRef.current) return;

        if (mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: `https://api.maptiler.com/maps/satellite/style.json?key=${import.meta.env.VITE_PUBLIC_TOKEN_MAP}`,
            center,
            zoom: zoomLevel,
            attributionControl: false,
            interactive: true,
        });

        mapRef.current = map;

        if (isStatic) {
            map.dragPan.disable();
            map.scrollZoom.disable();
            map.doubleClickZoom.disable();
            map.touchZoomRotate.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.boxZoom.disable();
        }

        if (createControll) {
            map.addControl(new maplibregl.NavigationControl(), "top-right");
        }

        new maplibregl.Marker().setLngLat(center).addTo(map);

        map.on("load", () => {
            if (!map.getSource("circle-source")) {
                map.addSource("circle-source", {
                    type: "geojson",
                    data: circleData,
                });

                map.addLayer({
                    id: "circle-layer",
                    type: "fill",
                    source: "circle-source",
                    paint: {
                        "fill-color": "#00ffff",
                        "fill-opacity": 0.3,
                    },
                });
            }
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [
        createControll,
        zoomLevel,
        isStatic,
        circleData,
    ]);

    React.useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        showedStation.forEach((station) => {
            const lon = station.longitude || station.LON;
            const lat = station.latitude || station.LAT;

            const marker = new maplibregl.Marker({ color: "#FF0000" })
                .setLngLat([lon, lat])
                .setPopup(
                    new maplibregl.Popup({ offset: 25 }).setHTML(
                        `<strong>${station.Station_Name}</strong><br>ID: ${station.Station_ID}`
                    )
                )
                .addTo(map);

            markersRef.current.push(marker);
        });

    }, [showedStation]);

    React.useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        const source = map.getSource("circle-source") as maplibregl.GeoJSONSource;

        if (source) {
            source.setData(circleData);
        }

    }, [circleData]);

    return (
        <div className="w-full h-full">
            <div
                ref={mapContainerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0b1220",
                }}
            />
        </div>
    );
}