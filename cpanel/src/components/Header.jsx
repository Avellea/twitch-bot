import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-neutral-900 text-white py-4 shadow">
            <nav className="container mx-auto flex items-center justify-between px-4">
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-purple-400 transition">NekoBot</Link>
                </div>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-purple-400 transition">Home</Link>
                    <Link to="/panel" className="hover:text-purple-400 transition">Panel</Link>
                    <Link to="/moderation" className="hover:text-purple-400 transition">Moderation</Link>
                    <Link to="/database" className="hover:text-purple-400 transition">Database</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;