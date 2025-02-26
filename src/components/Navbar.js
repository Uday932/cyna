"use client";

import AppContext from "@/app/context/AppContext.js";
import routes from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { useContext, useState } from "react";
import Button from "./ui/Button";

const Navbar = () => {
  const { state, logOut } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    logOut();

    router.push(routes.home());
  };

  return (
    <nav className="bg-primary py-4 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-2xl font-bold">
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
        <div className="ml-auto flex items-center gap-4">
          {/* Search Icon */}
          <Button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            color="bg-transparent"
          >
            <Image
              src="/assets/search.png"
              alt="Search"
              width={40}
              height={40}
              priority
            />
          </Button>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className={`ml-2 rounded-lg border border-gray-300 px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-button ${isSearchOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-[-20px] opacity-0"}`}
            style={{ transition: "opacity 0.3s ease, transform 0.3s ease" }}
          />
          {/* Cart Icon */}
          <Link href="/cart">
            <Image
              src="/assets/cart.png"
              alt="Cart"
              width={40}
              height={40}
              priority
            />
          </Link>
          {/* Menu Icon */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            color="bg-transparent"
          >
            <Image
              src="/assets/menu.png"
              alt="Menu"
              width={40}
              height={40}
              priority
            />
          </Button>
        </div>
      </div>

      {/* Side Menu */}
      {isMenuOpen && (
        <div
          className="fixed left-0 top-0 z-40 size-full bg-gray-700 opacity-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-secondary text-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <ul className="mt-4">
            <li className="py-2">
              <Link
                href={routes.home()}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Accueil
              </Link>
            </li>
            <li className="py-2">
              <Link
                href={routes.categories()}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Catégories
              </Link>
            </li>
            <li className="py-2">
              <Link
                href={routes.products()}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Produits
              </Link>
            </li>
            <li className="py-2">
              <Link
                href={routes.cart()}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Panier
              </Link>
            </li>
            <li className="py-2">
              <Link
                href={routes.checkout()}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Checkout
              </Link>
            </li>
            <li className="py-2">
              <Link
                href={routes.contact()}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-gray-300"
              >
                Contact
              </Link>
            </li>

            {state.session ? (
              <>
                <li className="py-2">
                  <Link
                    href={routes.account()}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Mon Compte
                  </Link>
                </li>

                <Button onClick={() => handleLogOut()}>Se déconecter</Button>
              </>
            ) : (
              <>
                <li className="py-2">
                  <Link
                    href={routes.signs.signIn()}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Se Connecter
                  </Link>
                </li>

                <li className="py-2">
                  <Link
                    href={routes.signs.signUp()}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gray-300"
                  >
                    Créer un Compte
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
