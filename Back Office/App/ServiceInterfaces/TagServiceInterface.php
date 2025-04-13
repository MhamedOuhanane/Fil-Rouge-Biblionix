<?php

namespace App\ServiceInterfaces;

interface TagServiceInterface
{
    public function getTags($search);
    public function insertMulTags($names);
    public function updateTag($name, $tag);
    public function deleteTag($tag);

}