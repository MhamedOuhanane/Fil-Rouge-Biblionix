<?php 

namespace App\ServiceInterfaces;

interface BadgeServiceInterface
{
    public function getBadges($search);
    public function createBadge($data);
    public function updateBadge($data, $badge);
    // public function deleteBadge($badge);
    // public function restaureBadge($badge);
}