<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('lecteurs', function (Blueprint $table) {
            $table->string('city')->nullable();
            $table->integer('reserve_number')->default(0);
            $table->integer('prolengement_number')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lecteurs', function (Blueprint $table) {
            //
        });
    }
};
