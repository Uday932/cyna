"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      {/* Fixed Text Section */}
      <section className="container mx-auto px-4 py-16 text-center text-white">
        <p className="mb-8 text-lg md:text-xl">
          Mise à jour régulière des messages importants ou des descriptions
          spécifiques.
        </p>
      </section>

      {/* Categories Section */}
      <section className="bg-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black uppercase text-primary">
            Nos Catégories
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Example Category */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                Catégorie 1
              </h3>
              <p className="text-gray-700">Description de la catégorie 1.</p>
            </div>
            {/* Add more categories as needed */}
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="bg-light py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-black uppercase text-primary">
            Les Top Produits du moment
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Example Product */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-2xl font-bold text-primary">
                Produit 1
              </h3>
              <p className="text-gray-700">Description du produit 1.</p>
            </div>
            {/* Add more products as needed */}
          </div>
        </div>
      </section>
    </main>
  );
}
