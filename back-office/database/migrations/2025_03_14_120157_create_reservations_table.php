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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->enum('status_Res', ['En Attente', 'Accepter', 'Refuser','En Cours', 'Terminer'])->default('En Attente');
            $table->date('prolongement')->nullable();
            $table->enum('status_Pro', ['Pas de Prolengement', 'En Attente', 'Accepter', 'Refuser','En Cours', 'Terminer'])->default('Pas de Prolengement');
            $table->morphs('reservationtable');
            $table->dateTime('returned_at')->nullable();
            $table->timestamps();

            $table->foreignId('livre_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
