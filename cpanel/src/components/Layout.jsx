function Layout({children}) {
    return (
        <div className="flex justify-center min-h-screen bg-neutral-900 text-white px-4">
            {children}
        </div>
    );
}

export default Layout