<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBadgeRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255', 'unique:badges,title'],
            'content' => ['required', 'string', 'min:80'],   
            'prix' => ['required', 'numeric', 'min:0', 'max:999'],  
            'reservation' => ['required', 'integer', 'min:1', 'max:10'],  
            'duration' => ['required', 'integer', 'min:0', 'max:35'],    
            'prolongation' => ['required', 'integer', 'min:0'], 
        ];
    }

    


}
