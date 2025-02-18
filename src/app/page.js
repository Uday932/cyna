"use client";

import { useState } from 'react';


export default function Home() {
    return (
        <main className="min-h-screen bg-primary">


            {/* Fixed Text Section */}
            <section className="container mx-auto px-4 py-16 text-white text-center">
                <p className="text-lg md:text-xl mb-8">Mise à jour régulière des messages importants ou des descriptions spécifiques.</p>
            </section>

            {/* Categories Section */}
            <section className="bg-[#F2F2F2] py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl uppercase text-primary text-center mb-12 font-black">Nos Catégories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Example Category */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl text-primary mb-4 font-bold">Catégorie 1</h3>
                            <p className="text-gray-700">Description de la catégorie 1.</p>
                        </div>
                        {/* Add more categories as needed */}
                    </div>
                </div>
            </section>

            {/* Top Products Section */}
            <section className="bg-[#F2F2F2] py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl uppercase text-primary text-center mb-12 font-black">Les Top Produits du moment</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Example Product */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl text-primary mb-4 font-bold">Produit 1</h3>
                            <p className="text-gray-700">Description du produit 1.</p>
                        </div>
                        {/* Add more products as needed */}
                    </div>
                </div>
            </section>
        </main>
    );
}
