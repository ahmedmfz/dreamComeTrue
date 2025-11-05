<?php

namespace App\Models;

use App\Enums\StockStatus;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['product_name', 'price', 'category', 'stock_status'];

    protected $casts = [
        'stock_status' => StockStatus::class,
    ];
}
