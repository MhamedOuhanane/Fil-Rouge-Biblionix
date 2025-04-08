<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FilterArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $status = ['Publié', 'Refusé', 'En Attente'];
        return [
            'search' => ['nullable', 'string'],
            'tag' => ['nullable', 'integer', 'existe:tags,id'],
            'categorie' => ['nullable', 'integer', 'exists:categories,id'],
            'date' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:Publié, Refusé, En Attente'],
            'pageArticles' => ['nullable', 'required', 'integer', 'in:9,15,24'],
        ];
    }
}
