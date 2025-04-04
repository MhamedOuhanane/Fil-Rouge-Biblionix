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
            'title' => ['required', 'string', 'unique:livres,title,' . $livre->id],
            'summary' => ['required', 'string', 'min:50'],
            'photo' => ['required', 'file', 'mimes:png,jpg'],
            'author' => ['required', 'string'],
            'quantity' => ['required', 'integer', 'min:0'],
            'tags' => ['array'],
            'tags.*' => ['integer', 'distinct', 'exists:tags,id'],
        ];
    }
}
