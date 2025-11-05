<?php

namespace App\Http\Controllers;

use App\Helper\ApiResponseHelper;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductCollection;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Modules\Expense\Transformers\Expense\ExpenseCollection;
use Symfony\Component\HttpKernel\HttpCache\Store;

class ProductController extends Controller
{
    public $productService;
    public function __construct()
    {
        $this->productService = new ProductService();
    }

    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="products api",
     *     tags={"products"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="page number",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *          name="per_page",
     *          in="query",
     *          description="count of rows in a single page",
     *          required=false,
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="test product",
     *         required=false,
     *      @OA\Schema(type="text")
     *      ),
     *     @OA\Response(response="200", description="Success"),
     *     @OA\Response(response="422", description="Invalid Request Validation"),
     * )
     */
    public function index(Request $request)
    {
        $products = $this->productService->viewAll($request->all() , $request->per_page ?? 15);

        return ApiResponseHelper::returnJSON(
            new ProductCollection($products)
        );
    }

    /**
     * @OA\Post(
     *     path="/api/products",
     *     summary="Store product",
     *     tags={"products"},
     * @OA\RequestBody(
     *    @OA\JsonContent(
     *       required={"product_name","price","category","stock_status"},
     *       @OA\Property(property="product_name", type="string", format="text", example="Test Product"),
     *       @OA\Property(property="price", type="string", format="number", example="230"),
     *       @OA\Property(property="category", type="string", format="text", example="cars"),
     *       @OA\Property(property="stock_status", type="string", format="number", example="1")
     *    ),
     * ),
     *     @OA\Response(response="201", description="Product created successfully"),
     *     @OA\Response(response="422", description="Invalid Request Validation"),
     * )
     */
    public function store(StoreProductRequest $request)
    {
        $product = $this->productService->createProduct($request->validated());
        return response()->json($product, 201);
    }
}
