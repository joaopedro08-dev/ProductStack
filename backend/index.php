<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set('America/Sao_Paulo');

if(isset($_GET['path'])) {
    $path = explode('/', $_GET['path']);
} else {
    echo "Caminho não fornecido.";
    exit;
}

$api    = isset($path[1]) ? $path[1] : null;
$action = isset($path[2]) ? $path[2] : '';
$param  = isset($path[3]) ? $path[3] : '';

$request = $_SERVER['REQUEST_METHOD'];

if (
    isset($_SERVER['REQUEST_METHOD']) &&
    $_SERVER['REQUEST_METHOD'] === 'OPTIONS'
) {
    http_response_code(204);
    exit;
}

$apiFile = __DIR__ . "/api/{$path[1]}/{$path[1]}.php";
if (file_exists($apiFile)) {
    include_once $apiFile;
} else {
    echo json_encode(["ERRO" => "API não encontrada."]);
    exit;
}