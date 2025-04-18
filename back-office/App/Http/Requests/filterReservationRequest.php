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
            'pagination' => ['required', 'integer', 'in:30,6'],
            'status_Res' => ['nullable', 'string', 'in:En Attente,Accepter,Refuser,En Cours,Terminer'],
            'status_Pro' => ['nullable', 'string', 'in:En Attente,Accepter,Refuser,En Cours,Terminer'],
            'date_filter' => ['nullable', 'integer']
        ];
    }
}
