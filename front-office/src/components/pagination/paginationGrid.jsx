
const PaginationGrad = ({ currentPage = 1, totalPages = 1, handlePreviousPage, handleNextPage }) => {

    return (
        <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-amber-700 text-white hover:bg-amber-800"
              }`}
            >
              ⬅️ Précédent
            </button>
            <span className="text-amber-900">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-amber-700 text-white hover:bg-amber-800"
              }`}
            >
              Suivant ➡️
            </button>
        </div>
    );
}

export default PaginationGrad;