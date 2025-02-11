import Link from 'next/link'; 
import Image from 'next/image'; 

const Navbar = () => {
    return (
        <nav className="bg-primary text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="logo text-2xl font-bold">
                    <Link href="/"><Image 
                            src="/assets/cyna-white.png" 
                            alt="Logo" 
                            width={125} 
                            height={50}
                            priority 
                        />
                        </Link> 
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher des produits..."
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-button"
                    />
                </div>
                <div className="cart">
                    <Link href="/cart" className="text-white hover:text-button">Panier</Link>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className="hover:text-button">Accueil</Link>
                    </li>
                    <li>
                        <Link href="/categories" className="hover:text-button">Catégories</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
