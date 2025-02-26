"use client";

import Text from "@@/ui/Text";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      {/* Fixed Text Section */}
      <section className="container mx-auto bg-secondary px-4 py-16 text-center">
        <Text className="mb-8">
          Mise à jour régulière des messages importants ou des descriptions
          spécifiques.
        </Text>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text
            size="title1"
            className="mb-12 text-center font-black uppercase text-primary"
          >
            Nos Catégories
          </Text>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                Catégorie 1
              </Text>
              <Text color="gray">Description de la catégorie 1.</Text>
            </div>
            {/* Add more categories as needed */}
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text
            size="title1"
            className="mb-12 text-center font-black uppercase text-primary"
          >
            Les Top Produits du moment
          </Text>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                Produit 1
              </Text>
              <Text color="gray">Description du produit 1.</Text>
            </div>
            {/* Add more products as needed */}
          </div>
        </div>
      </section>
    </main>
  );
}
