<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('auteurs', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });

        DB::statement(
            'CREATE TABLE auteurs(
                id BIGSERIAL PRIMARY KEY,
                certificate VARCHAR(255) NULL,
                country VARCHAR(255) NULL,
                CONSTRAINT auteurs_id_unique UNIQUE (id)
            )INHERITS(users)'
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auteurs');
    }
};
