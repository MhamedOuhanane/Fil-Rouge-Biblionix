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
        // Schema::create('lecteurs', function (Blueprint $table) {
            // $table->id();
            // $table->timestamps();
        // });

        DB::statement(
            'CREATE TABLE lecteurs(
                id  BIGSERIAL PRIMARY KEY,
                city VARCHAR(255) NULL,
                reserve_number int NULL DEFAULT 0,
                prolengement_number int NULL DEFAULT 0,
                CONSTRAINT lecteurs_id_unique UNIQUE (id)
            )INHERITS(users);'         
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecteurs');
    }
};
