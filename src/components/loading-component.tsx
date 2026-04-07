function LoadingComponent() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>
        </div>
    )
}

export default LoadingComponent