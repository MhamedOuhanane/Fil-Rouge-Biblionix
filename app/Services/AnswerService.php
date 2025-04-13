<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Message;
use App\RepositoryInterfaces\AnswerRepositoryInterface;
use App\ServiceInterfaces\AnswerServiceInterface;
use Illuminate\Support\Facades\Auth;

class AnswerService implements AnswerServiceInterface
{
    protected $answerRepository;

    public function __construct(AnswerRepositoryInterface $answerRepository)
    {
        $this->answerRepository = $answerRepository;
    }

    public function getMessageAnswers(Message $Message)
    {
        $user = Auth::user();
        if (!in_array($user->role->name, ['admin', 'librarian']) && $user->id != $Message->messagetable->id) {
            return [
                'message' => "Vous n\'avez pas les permissions nécessaires pour trouvé les answers de ce messages.",
                'statusData' => 401,
            ];
        }
        $result = $this->answerRepository->getMessageAnswers($Message);

        if (!$result) {
            $message = "Erreur lours de la recupération des Answers. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun answer.";
            $statusData = 404;
        } else {
            $message = "Les Answers trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Answers' => $result,
            'statusData' => $statusData,
        ];
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