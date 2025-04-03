<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'search' => ['string'],
            'tag' => ['integer', 'existe:tags,id'],
            'categorie' => ['integer', 'exists:categories,id'],
            'date' => ['string'],
            'status' => ['string', 'in:Publié,Refusé,En Attente'],
            'pageArticles' => ['required', 'integer', 'in:5,10,15'],
        ];
    }
}
