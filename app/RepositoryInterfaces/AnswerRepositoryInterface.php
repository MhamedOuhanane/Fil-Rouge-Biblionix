<?php

namespace App\RepositoryInterfaces;

use App\Models\Answer;
use App\Models\Librarian;
use App\Models\Message;

interface AnswerRepositoryInterface
{
    public function getAllAnswers();
    public function getLibrarianAnswers(Librarian $Librarain);
    public function getMessageAnswers(Message $Message);
    public function countAnswerMessage(Message $Message);
    public function findAnswer($Answer_id);
    public function createAnswer(Librarian $Librarain, Message $Message, $data);
    public function updateAnswer(Answer $Answer, $data);
    public function deleteAnswer(Answer $Answer);
}