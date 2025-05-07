import React from 'react';

// Données des services traduites en français
const services = [
  { icon: "📚", title: "Réservation de livres", description: "Réservez vos livres préférés facilement depuis n'importe où." },
  { icon: "🕒", title: "Prolongation de réservation", description: "Prolongez la durée d'emprunt de votre livre en ligne." },
  // { icon: "💬", title: "Contacter le bibliothécaire", description: "Envoyez vos questions directement aux bibliothécaires." },
  // { icon: "📝", title: "Articles et contenu culturel", description: "Découvrez des articles et critiques remarquables." },
  { icon: "👨‍💼", title: "Auteurs", description: "Découvrez les auteurs et consultez leurs biographies." },
  { icon: "🌟", title: "Avis et évaluations", description: "Lisez et partagez vos avis sur les livres." },
];

const ServicesSection = () => {
  return (
    <section className="container mx-auto px-8 md:px-16 py-10">
      <h2 className="text-2xl mb-6 text-center">Nos Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center py-6"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-center px-4">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;