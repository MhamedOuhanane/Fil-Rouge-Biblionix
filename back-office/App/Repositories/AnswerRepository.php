<?php

namespace App\Repositories;

use App\Models\Answer;
use App\Models\Librarian;
use App\Models\Message;
use App\RepositoryInterfaces\AnswerRepositoryInterface;

class AnswerRepository implements AnswerRepositoryInterface
{
    public function getAllAnswers()
    {
        return Answer::with('librarian')
                        ->orderBy('created_at')
                        ->get();
    }
    
    public function getMessageAnswers(Message $Message)
    {
        return Answer::with('librarian')
                        ->where('message_id', $Message->id)
                        ->orderBy('created_at', 'DESC')
                        ->get();
    }

    public function getLibrarianAnswers(Librarian $Librarain)
    {
        return $Librarain->answers;
    }
    
    
    public function countAnswerMessage(Message $Message)
    {
        return Answer::where('message_id', $Message)
                        ->count();
    }
    
    public function findAnswer($Answer_id)
    {
        return Answer::with('librarian')
                        ->find($Answer_id);
    }
    
    public function createAnswer(Librarian $Librarian, Message $Message, $data)
    {
        $answer = new Answer();

        $answer->fill($data);
        $answer->message()->associate($Message);
        $answer->librarian()->associate($Librarian);

        $answer->save();
        return $answer->load(['message', 'librarian']);
    }
    
    public function updateAnswer(Answer $Answer, $data)
    {
        return $Answer->updated($data);
    }
    
    public function deleteAnswer(Answer $Answer)
    {
        return $Answer->delete();
    }
    
}