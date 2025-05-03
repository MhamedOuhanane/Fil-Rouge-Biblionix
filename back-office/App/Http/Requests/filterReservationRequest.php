<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class filterReservationRequest extends FormRequest
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
            'pagination' => ['nullable', 'integer', 'in:7,3'],
            'status_Res' => ['nullable', 'string', 'in:En Attente,Accepter,Refuser,En Cours,Terminer'],
            'status_Pro' => ['nullable', 'string', 'in:Pas de Pro,En Attente,Accepter,Refuser,En Cours,Terminer'],
            'date_filter' => ['nullable', 'integer']
        ];
    }
}
