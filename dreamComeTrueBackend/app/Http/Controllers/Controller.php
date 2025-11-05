<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *    title="Dream Come True Information Technology Api Docs",
 *    version="v1",
 * )
 * @OA\SecurityScheme(
 *     type="http",
 *     securityScheme="api_key",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
abstract class Controller
{
    //
}
