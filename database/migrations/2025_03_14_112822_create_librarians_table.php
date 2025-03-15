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
        // Schema::create('librarians', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });

        DB::statement(
            'CREATE TABLE librarians()INHERITS(users);'           
        );

        DB::statement(
            'ALTER TABLE librarians ADD CONSTRAINT librarians_id_pkey PRIMARY KEY (id);'           
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('librarians');
    }
};
