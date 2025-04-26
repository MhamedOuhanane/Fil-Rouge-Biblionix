<?php

namespace App\Repositories;

use App\Models\Librarian;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;

class LibrarianRepository implements LibrarianRepositoryInterface
{
    public function findLibrarian($Librarian_id)
    {
        return Librarian::find($Librarian_id);
    }

    public function deleteLibrarian(Librarian $librarian) {
        return $librarian->delete();
    }

    public function saveLibrarian(Librarian $librarian) {
        return $librarian->save();
    }
}