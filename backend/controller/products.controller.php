<?php
include_once dirname(__DIR__, 1) . '/config/db.php';

$api = isset($api) ? $api : null;
$method = isset($method) ? $method : $_SERVER['REQUEST_METHOD'];
$action = isset($action) ? $action : null;
$param = isset($param) ? $param : null;

if ($api === null || $api === 'products') {
    if ($method == 'GET') {
        include_once dirname(__DIR__, 1) . '/http/get.php';
    } else if ($method == 'POST') {
        include_once dirname(__DIR__, 1) . '/http/post.php';
    } else if ($method == 'PUT') {
        include_once dirname(__DIR__, 1) . '/http/put.php';
    } else if ($method == 'DELETE') {
        include_once dirname(__DIR__, 1) . '/http/delete.php';
    } else {
        echo json_encode(["ERRO" => "Método HTTP não suportado."]);
        exit;
    }

} else {
    echo "API não encontrada.";
    exit;
}
