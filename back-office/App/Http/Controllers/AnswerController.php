<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Models\Message;
use App\ServiceInterfaces\AnswerServiceInterface;

class AnswerController extends Controller
{
    protected $answerService;

    public function __construct(AnswerServiceInterface $answerService)
    {
        $this->answerService = $answerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Message $message)
    {
        $result = $this->answerService->getMessageAnswers($message);

        return response()->json([
            'message' => $result['message'],
            'Message' => $message,
            'Answers' => $result['Answers'] ?? null,
        ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnswerRequest $request, Message $message)
    {
        $data = $request->only('content');
        $result = $this->answerService->createAnswer($message, $data);

        return response()->json([
            'message' => $result['message'],
            'Answer' => $result['Answer'] ?? null,
        ], $result['statusData']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message, Answer $answer)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnswerRequest $request, Answer $answer)
    {
        $data = $request->only('content');
        $result = $this->answerService->updateAnswer($answer, $data);

        return response()->json([
            'message' => $result['message'],
            'Answer' => $answer,
        ], $result['statusData']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Answer $answer)
    {
        $result = $this->answerService->deleteAnswer($answer);

        return response()->json([
            'message' => $result['message'],
            'Answer' => $answer,
        ], $result['statusData']);
    }
}
