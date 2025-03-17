<?php

namespace App\Repositories;

use App\Models\Tag;
use App\RepositoryInterfaces\TagRepositoryInterface;

class TagRepository implements TagRepositoryInterface
{
    public function createTag($data)
    {
        return Tag::create($data);
    }

    public function updateTag($data, $tag)
    {
        return $tag->update($data);
    }

    public function getAllTags()
    {
        return Tag::all();
    }

    public function searchTags($search)
    {
        return Tag::where('name', 'ILIKE', $search);
    }

    public function deleteTag($tag)
    {
        return $tag->delete();
    }

    // public function findTag()
    // {

    // }

}