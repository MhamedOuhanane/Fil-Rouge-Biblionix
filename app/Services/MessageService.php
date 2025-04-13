<?php

namespace App\Services;

use App\Models\Message;
use App\RepositoryInterfaces\AuteurRepositoryInterface;
use App\RepositoryInterfaces\LecteurRepositoryInterface;
use App\RepositoryInterfaces\MessageRepositoryInterface;
use App\ServiceInterfaces\MessageServiceInterface;
use Illuminate\Support\Facades\Auth;

class MessageService implements MessageServiceInterface
{
    protected $messageRepository;
    protected $auteurRepository;
    protected $lecteurRepository;

    public function __construct(MessageRepositoryInterface $messageRepository,
                                AuteurRepositoryInterface $auteurRepository,
                                LecteurRepositoryInterface $lecteurRepository
                                )
    {
        $this->messageRepository = $messageRepository;
        $this->auteurRepository = $auteurRepository;
        $this->lecteurRepository = $lecteurRepository;
    }

    public function getMessages($pagination = 30)
    {
        $user = Auth::user();

        if(in_array($user->role->name, ['librarian', 'admin']))
        {
            $result = $this->messageRepository->getAllMessages();
        } else {
            if ($user->role->name == 'auteur') {
                $user = $this->auteurRepository->findAuteur($user->id);
            } elseif ($user->role->name == 'lecteur') {
                $user = $this->lecteurRepository->findLecteur($user->id);
            }

            $result = $this->messageRepository->getUserMessages($user);
        }

        if (!$result) {
            $message = "Erreur lours de la recupération des Messages. Veuillez réessayer plus tard.";
            $statusData = 500;
        } elseif ($result->isEmpty()) {
            $message = "Il n'existe actuellement aucun message.";
            $statusData = 404;
        } else {
            $message = "Les Messages trouvés avec succès.";
            $statusData = 200;
        }

        return [
            'message' => $message,
            'Messages' => $result,
            'statusData' => $statusData,
        ];
    }
    
    public function findMessage($Message_id)
    {

    }
    
    public function insertMessage($data)
    {

    }
    
    public function updateMessage(Message $Message, $data)
    {

    }
    
    public function deleteMessage(Message $Message)
    {

    }
    
}