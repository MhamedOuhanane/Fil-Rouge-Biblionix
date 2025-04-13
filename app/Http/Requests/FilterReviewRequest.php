<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterReviewRequest extends FormRequest
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
            'Review_By' => ['nullable', 'string', 'in:App\\Models\\Auteur,App\\Models\\Lecteur'],
            'Create_Date' => ['nullable', 'integer'],
            'Review_On' => ['nullable', 'string', 'in:App\\Models\\Auteur,App\\Models\\Livre']
        ];
    }
}
