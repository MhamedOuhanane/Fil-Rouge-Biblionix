<?php

namespace App\RepositoryInterfaces;

interface BadgeRepositoryInterface
{
    public function findBadgeById($badgeId);
    public function findBadgeByTitle($badgeTitle);

    public function getAllBadges();
    public function searchBadges($data);
    public function create($data);
    public function update($data, $badge);
    public function delete($badge);

}