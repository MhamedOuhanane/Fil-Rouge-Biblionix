<?php 

namespace App\RepositoryInterfaces;

use App\Models\Librarian;

interface LibrarianRepositoryInterface 
{
    public function findLibrarian($id);
    public function deleteLibrarian(Librarian $Librarian); 
    public function saveLibrarian(Librarian $Librarian);
}