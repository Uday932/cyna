"use client";

import { useState } from "react";
import Link from 'next/link'; 
import Image from 'next/image'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <nav className="bg-primary text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="logo text-2xl font-bold">
                    <Link href="/">
                        <Image 
                            src="/assets/cyna-white.png" 
                            alt="Logo" 
                            width={125} 
                            height={50}
                            priority 
                        />
                    </Link> 
                </div>
                <div className="flex items-center gap-4 ml-auto">
                    {/* Search Icon */}
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <Image 
                            src="/assets/search.png" 
                            alt="Search" 
                            width={40} 
                            height={40} 
                        />
                    </button>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Rechercher des produits..."
                        className={`ml-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-button transition-all duration-300 ease-in-out transform ${isSearchOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px] pointer-events-none'}`}
                        style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                    />

                    {/* Cart Icon */}
                    <Link href="/cart">
                        <Image 
                            src="/assets/cart.png" 
                            alt="Cart" 
                            width={40} 
                            height={40} 
                        />
                    </Link>

                    {/* Menu Icon */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Image 
                            src="/assets/menu.png" 
                            alt="Menu" 
                            width={40} 
                            height={40} 
                        />
                    </button>
                </div>
            </div>

            {/* Side Menu */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-secondary text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <ul className="mt-4">
                        <li className="py-2">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Accueil</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Catégories</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Produits</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Panier</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/checkout" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Checkout</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Contact</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/mon-compte" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Mon Compte</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/creer-un-compte" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Créer un Compte</Link>
                        </li>
                        <li className="py-2">
                            <Link href="/se-connecter" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Se Connecter</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
