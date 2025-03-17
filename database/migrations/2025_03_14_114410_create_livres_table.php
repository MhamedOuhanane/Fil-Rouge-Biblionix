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
        Schema::create('livres', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('summary');
            $table->string('photo');
            $table->string('author');
            $table->enum('status_livre', ['En Attente', 'Accepter', 'Refuser']);
            $table->enum('disponibilite', ['Disponible', 'Rupture de stock', 'Indisponible']);
            $table->integer('quantity');
            $table->timestamps();

            $table->foreignId('categorie_id')->constrained()->onDelete('cascade');
            $table->foreignId('auteur_id')->nullable()->constrained()->onDelete('set null');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
