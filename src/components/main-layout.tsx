import React from 'react';
import imageAssets from "../assets/hydro-lab-icon.png"
import { ChevronLeftCircle } from 'lucide-react';
import DataContextProvider from '../context-provider/data-provider';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const handleBack = () => {
        if (window.history.length > 2) {
            window.history.back();
        } else {
            window.location.href = "/";
        }
    };

    return (
        <DataContextProvider>
            <div className='w-full min-h-screen relative'>
                {/* nav back button */}
                <div className='fixed w-8 h-8 left-5 top-10 rounded-md cursor-pointer flex justify-center items-center bg-white border border-gray-300'>
                    <div onClick={() => handleBack()}>
                        <ChevronLeftCircle className='w-full h-full text-blue-500' />
                    </div>
                </div>
                <a className='fixed w-16 h-16 right-5 bottom-10 rounded-full cursor-pointer' href='https://www.hidro.web.id/'>
                    <img src={imageAssets} alt="image asset" />
                </a>
                <div className='w-full min-h-screen'>
                    {children}
                </div>
            </div>
        </DataContextProvider>
    );
}
