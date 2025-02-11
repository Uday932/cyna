export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-5xl uppercase mb-6 font-black">
            Secure Your Future
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Expert en cybersécurité pour PME et ETI
          </p>
          <button className="bg-button text-white uppercase px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all">
            Nous Contacter
          </button>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#F2F2F2] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl uppercase text-primary text-center mb-12 font-black">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Réactivité */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-primary mb-4 font-bold">Réactivité</h3>
              <p className="text-gray-700">
                Réponse rapide aux besoins des clients
              </p>
            </div>
            {/* Proximité */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-primary mb-4 font-bold">Proximité</h3>
              <p className="text-gray-700">
                Relation étroite avec les clients
              </p>
            </div>
            {/* Expertise */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl text-primary mb-4 font-bold">Expertise</h3>
              <p className="text-gray-700">
                Connaissance approfondie en cybersécurité
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
