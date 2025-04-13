<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\ServiceInterfaces\MessageServiceInterface;

class MessageController extends Controller
{
    protected $messageService;

    public function __construct(MessageServiceInterface $messageService)
    {
        $this->messageService = $messageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $result = $this->messageService->getMessages();

    //    dd($result);
       return response()->json([
            'message' => $result['message'],
            'Messages' => $result['Messages']->items() ?? null,
       ], $result['statusData']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
