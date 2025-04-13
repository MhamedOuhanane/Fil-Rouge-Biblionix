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
}