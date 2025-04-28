<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterLivreRequest extends FormRequest
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
            'search' => ['nullable', 'string'],
            'categorie' => ['nullable', 'integer', 'exists:categories,id'],
            'disponibilite', ['nullable', 'string', 'in:Disponible,Rupture de stock,Indisponible'],
            'status_livre' => ['nullable', 'string', 'in:En Attente,Accepter,Refuser'],
            'pageLivres' => ['nullable', 'integer', 'in:9,15,24'],
            'tag' => ['nullable', 'integer', 'existe:tags,id'],
        ];
    }
}
