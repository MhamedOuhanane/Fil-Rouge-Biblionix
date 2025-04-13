<?php

namespace App\ServiceInterfaces;

use App\Models\Message;

interface MessageServiceInterface
{
    public function getMessages($pagination = 30);
    public function findMessage($Message_id);
    public function insertMessage($data);
    public function updateMessage(Message $Message, $data);
    public function deleteMessage(Message $Message);
}