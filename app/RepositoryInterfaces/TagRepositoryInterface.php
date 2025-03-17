<?php

namespace App\RepositoryInterfaces;

interface TagRepositoryInterface
{
    public function createTag($data);
    public function updateTag();
    public function getAllTags();
    public function searchTags($search);
    public function deleteTag();
    public function findTag();
}