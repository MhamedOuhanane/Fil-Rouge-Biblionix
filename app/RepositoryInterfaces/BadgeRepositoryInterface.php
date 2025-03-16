<?php

namespace App\RepositoryInterfaces;

interface BadgeRepositoryInterface
{
    public function findBadgeById($badgeId);
    public function findBadgeByTitle($badgeTitle);
}