<?php

namespace App\RepositoryInterfaces;

interface TagRepositoryInterface
{
    public function createTag($data);
    public function updateTag($data, $tag);
    public function getAllTags();
    public function searchTags($search);
    public function deleteTag($tag);
    public function findTag();
}