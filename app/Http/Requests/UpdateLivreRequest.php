<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLivreRequest extends FormRequest
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
        $livre = $this->route('livre');
        
        return [
            'title' => ['required', 'string', 'unique:livres,title,'. $livre->id],
            'summary' => ['required', 'string', 'min:50'],
            'photo' => ['nullable', 'file', 'mimes:png,jpg'],
            'author' => ['required', 'string'],
            'categorie_id' => ['required', 'integer', 'exists:categories,id'],
            'quantity' => ['nullable', 'integer', 'min:0'],
            'disponibilite', ['nullable', 'string', 'in:Disponible,Rupture de stock,Indisponible'],
            'status_livre' => ['nullable', 'string', 'in:En Attente,Accepter,Refuser'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'distinct', 'exists:tags,id'],
        ];
    }
}
