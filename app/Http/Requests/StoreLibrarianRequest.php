<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLibrarianRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:20', 'unique:livres,title'],
            'summary' => ['required', 'string', 'min:100'],
            'photo' => ['required', 'file', 'mimes:png,jpg,jpeg,gif,webp', 'max:5120'],
            'author' => ['required', 'string', 'max:20'],
            'quantity' => ['required', 'integer', 'min:0'],
            'categorie_id' => ['required', 'integer', 'exists:categories,id'],
            'tags' => ['array'],
            'tags.*' => ['integer', 'distinct', 'exists:tags,id'],
        ];
    }
}
