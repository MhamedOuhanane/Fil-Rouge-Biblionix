<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleRequest extends FormRequest
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
            'title' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string', 'min:10'],
            'content' => ['nullable', 'file', 'mimes:png,jpg,jpeg,gif,webp', 'max:5120'],
            'status' => ['nullable', 'string', 'in:Publié,Refusé,En Attente'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'distinct', 'exists:tags,id'],
        ];
    }
}
