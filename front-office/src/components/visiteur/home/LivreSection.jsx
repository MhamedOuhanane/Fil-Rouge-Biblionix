import { useEffect, useState } from "react";
import BookCard from "../LivreCard";
import { fetchLivre } from "../../../services/LivreService";
import Swal from "sweetalert2";

const BooksSection = () => {
    const [livre, setLivre] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    
      
      useEffect (() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const dataFetch = await fetchLivre();
            setLivre(dataFetch.livre);
          } catch (error) {
            await Swal.fire({
              icon: "error",
              title: "Erreur de récupération",
              text: error.message,
              confirmButtonText: "Réessayer",
              confirmButtonColor: "#d33",
            });
          } finally {
            setIsLoading(false);
          }
        };
        
        fetchData();
      }, []);    

    return (
        <section className="py-10 px-8 md:px-16">
            <h2 className="text-2xl font-bold text-[#8B4513] text-center mb-8">Nos Livres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {books.map((book , index) => (
                    (index < 5) &&
                    <BookCard
                        key={book.id}
                        book={book}
                        link={`/book/${book.id}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default BooksSection;