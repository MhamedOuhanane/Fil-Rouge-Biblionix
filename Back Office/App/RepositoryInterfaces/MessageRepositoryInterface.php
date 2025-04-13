<?php

namespace App\RepositoryInterfaces;

use App\Models\Message;

interface MessageRepositoryInterface
{
    public function getAllMessages($pagination = 30);
    public function getUserMessages($user, $pagination = 6);
    public function findMessage($Message_id);
    public function createMessage($user, $data);
    public function updateMessage(Message $Message, $data);
    public function deleteMessage(Message $Message);
}