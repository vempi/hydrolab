import React from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Map(
    { createControll = false, isStatic = true, zoomLevel = 9, centralPoint= {lon: 110.37833662342864, lat: -7.940883389023307}, }: 
    { createControll?: boolean, isStatic?: boolean, zoomLevel?: number, centralPoint?: {lon: number | 110.37833662342864, lat: number | -7.940883389023307} }
) {
    const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
    const mapRef = React.useRef<maplibregl.Map | null>(null);

    React.useEffect(() => {
        if (!mapRef.current && !mapContainerRef.current) {
            return;
        };

        const map = new maplibregl.Map({
            container: mapContainerRef.current ?? '',
            style: `https://api.maptiler.com/maps/satellite/style.json?key=${import.meta.env.VITE_PUBLIC_TOKEN_MAP}`,
            center: [centralPoint.lon, centralPoint.lat],
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

        new maplibregl.Marker()
            .setLngLat([centralPoint.lon, centralPoint.lat],)
            .addTo(map);

        return () => {
            map.remove();
        };
    }, [createControll, zoomLevel, isStatic, centralPoint]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full h-full rounded-md">
                <div
                    ref={mapContainerRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#0b1220",
                    }}
                />
            </div>
        </div>
    );
}
