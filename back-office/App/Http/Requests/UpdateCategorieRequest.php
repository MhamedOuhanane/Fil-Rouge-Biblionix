<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategorieRequest extends FormRequest
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
        $categorie = $this->route('categorie');
        return [
            'title' => ['required', 'string', 'max:255', 'unique:categories,title,'. $categorie->id],
            'logo' => ['file', 'mimes:png'],
            'content' => ['required', 'string', 'min:70'],
        ];
    }
}
