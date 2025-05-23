<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\ServiceInterfaces\TagServiceInterface;
use Illuminate\Http\Request;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagServiceInterface $tagService)
    {
        $this->tagService = $tagService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? null;

        $result = $this->tagService->getTags($search);

        return response()->json([
            'message' => $result['message'],
            'tags' => $result['tags'],
            'search' => $search,
        ], $result['status']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $result = $this->tagService->insertMulTags($request->name);

        return response()->json([
            'message' => $result['message'],
            'result' => $result['result']
        ], $result['status']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        return response()->json([
            'message' => "Récuperer le tag avec success",
            'result' => $tag,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagRequest $request, Tag $tag)
    {
        $result = $this->tagService->updateTag($request->name, $tag);

        return response()->json([
            'message' => $result['message'],
            'result' => $result['result'],
        ], $result['status']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $result = $this->tagService->deleteTag($tag);

        return response()->json([
            'message' => $result['message'],
            'result' => $result['result'],
        ], $result['status']);
    }
}
