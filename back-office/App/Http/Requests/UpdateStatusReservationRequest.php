<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusReservationRequest extends FormRequest
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
            'status_Res' => ['nullable', 'string', 'in:Accepter,Refuser'],
            'status_Pro' => ['nullable', 'string', 'in:Accepter,Refuser'],
            'returned_at' => ['nullable', 'boolean']
        ];
    }
}
