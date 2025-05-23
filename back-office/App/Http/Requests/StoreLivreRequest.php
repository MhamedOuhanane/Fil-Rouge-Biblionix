<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLivreRequest extends FormRequest
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
            'title' => ['required', 'string', 'unique:livres,title'],
            'summary' => ['required', 'string', 'min:50'],
            'photo' => ['required', 'file', 'mimes:png,jpg'],
            'author' => ['required', 'string'],
            'quantity' => ['nullable', 'integer', 'min:0'],
            'categorie_id' => ['required', 'integer', 'exists:categories,id'],
            'disponibilite' => ['nullable', 'string', 'in:Disponible,Rupture de stock,Indisponible'],
            'tags' => ['array'],
            'tags.*' => ['integer', 'distinct', 'exists:tags,id'],
        ];
    }
}
