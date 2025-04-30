<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user && ($user->role->name === 'lecteur' || $user->role->name === 'auteur');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $dateNow = now();
        return [
            'start_date' => ['required', 'date', 'after:'.$dateNow],
            'end_date' => ['required', 'date', 'after:start_date'],
            'livre_id' => ['required', 'integer', 'exists:livres,id'],
        ];
    }
}
