<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    public function viewAll($data , int $perPage = 15): LengthAwarePaginator
    {
        $query =  Product::query();

        $query->when(isset($data['search']) && !is_null($data['search']), function ($query) use ($data) {
            return $query->where('product_name' , 'LIKE' , "%{$data['search']}%");
        })->latest();

        return $query->paginate($perPage);
    }

    public function createProduct($data) {
       return Product::create($data);
    }
}
