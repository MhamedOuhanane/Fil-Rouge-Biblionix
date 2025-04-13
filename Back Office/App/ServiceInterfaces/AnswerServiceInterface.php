<?php

namespace App\ServiceInterfaces;

use App\Models\Answer;
use App\Models\Librarian;
use App\Models\Message;

interface AnswerServiceInterface
{
    public function getMessageAnswers(Message $Message);
    public function findAnswer($Answer_id);
    public function createAnswer(Message $Message, $data);
    public function updateAnswer(Answer $Answer, $data);
    public function deleteAnswer(Answer $Answer);
}