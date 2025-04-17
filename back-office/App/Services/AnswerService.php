<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Message;
use App\RepositoryInterfaces\AnswerRepositoryInterface;
use App\RepositoryInterfaces\LibrarianRepositoryInterface;
use App\ServiceInterfaces\AnswerServiceInterface;
use Illuminate\Support\Facades\Auth;

class AnswerService implements AnswerServiceInterface
{
    protected $answerRepository;
    protected $librarainRepository;

    public function __construct(AnswerRepositoryInterface $answerRepository,
                                LibrarianRepositoryInterface $librarainRepository
                                )
    {
        $this->answerRepository = $answerRepository;
        $this->librarainRepository = $librarainRepository;
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
        $result = $this->answerRepository->findAnswer($Answer_id);

        return [
            'message' => "Le Answer trouvés avec succès.",
            'Answer' => $result,
            'statusData' => 200,
        ];
    }
    
    public function createAnswer(Message $Message, $data)
    {
        $user = Auth::user();

        if ($user->role->name == 'librarian') {
            $createur = $this->librarainRepository->findLibrarian($user->id);
        } else {
            return [
                'message' => "Vous n\'avez pas les permissions nécessaires pour ajouté des answers de ce messages.",
                'statusData' => 401,
            ];
        }

        $result = $this->answerRepository->createAnswer($user, $Message, $data);

        if (!$result) {
            $message = "Erreur lours de la création d'Answer. Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "Ajouter un answer avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Answer' => $result,
            'statusData' => $statusData,
        ];
    }
    
    public function updateAnswer(Answer $Answer, $data)
    {
        $user = Auth::user();
        if ($user->role->name != 'librarian') {
            return [
                'message' => "Vous n\'avez pas les permissions nécessaires pour modifié la réponce de ce messages.",
                'statusData' => 401,
            ];
        }
        $result = $this->answerRepository->updateAnswer($Answer, $data);

        if (!$result) {
            $message = "Erreur lours de la modification du réponce. Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "La Réponce modifié avec succès.";
            $statusData = 200;
        }

        $result = $this->answerRepository->findAnswer($Answer->id);

        return [
            'message' => $message,
            'Answers' => $result,
            'statusData' => $statusData,
        ];
    }
    
    public function deleteAnswer(Answer $Answer)
    {
        $user = Auth::user();
        if ($user->role->name != 'librarian') {
            return [
                'message' => "Vous n\'avez pas les permissions nécessaires pour supprimé la réponce de ce messages.",
                'statusData' => 401,
            ];
        }
        $result = $this->answerRepository->deleteAnswer($Answer);

        if (!$result) {
            $message = "Erreur lours de la suppression du réponce. Veuillez réessayer plus tard.";
            $statusData = 500;
        } else {
            $message = "La Réponce supprimé avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'statusData' => $statusData,
        ];
    }
    
}