import BookCard from "../LivreCard";

const BooksSection = () => {
    const books = [
        {
            id: 1,
            title: "Le Petit Prince",
            author: "Antoine de Saint-Exupéry",
            cover: "path/to/le-petit-prince.jpg",
            rating: 5.0,
        },
        {
            id: 2,
            title: "1984",
            author: "George Orwell",
            cover: "path/to/1984.jpg",
            rating: 4.8,
        },
        {
            id: 3,
            title: "Orgueil et Préjugés",
            author: "Jane Austen",
            cover: "path/to/pride-and-prejudice.jpg",
            rating: 4.5,
        },
        {
            id: 4,
            title: "Le Seigneur des Anneaux",
            author: "J.R.R. Tolkien",
            cover: "path/to/lord-of-the-rings.jpg",
            rating: 4.9,
        },
        {
            id: 5,
            title: "Harry Potter à l'école des sorciers",
            author: "J.K. Rowling",
            cover: "path/to/harry-potter.jpg",
            rating: 4.7,
        },
    ];

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