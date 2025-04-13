<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Message;
use App\RepositoryInterfaces\AnswerRepositoryInterface;
use App\ServiceInterfaces\AnswerServiceInterface;

class AnswerService implements AnswerServiceInterface
{
    protected $answerRepository;

    public function __construct(AnswerRepositoryInterface $answerRepository)
    {
        $this->answerRepository = $answerRepository;
    }

    public function getMessageAnswers(Message $Message)
    {

    }
    
    public function findAnswer($Answer_id)
    {

    }
    
    public function createAnswer(Message $Message, $data)
    {

    }
    
    public function updateAnswer(Answer $Answer, $data)
    {

    }
    
    public function deleteAnswer(Answer $Answer)
    {

    }
    
}