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
            'review_By' => ['nullable', 'string', 'in:App\\Model\\Auteur,App\\Model\\Lecteur'],
            'created_at' => ['nullable', 'integer'],
            'review_On' => ['nullable', 'string', 'in:App\\Model\\Auteur,App\\Model\\Livre']
        ];
    }
}
