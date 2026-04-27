<?php

if ($action === '' && $param === '') {
    echo json_encode(["ERRO" => "Caminho não encontrado."]);
    exit;
}

if ($action === 'update' && $param === '') {
    echo json_encode(["ERRO" => "ID do produto não fornecido para atualização."]);
    exit;
}

if ($action === 'update' && ($param !== '' && is_numeric($param))) {
    $inputData = $_POST;
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';

    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $json = json_decode($raw, true);
        if (is_array($json)) {
            $inputData = $json;
        }
    }

    if (empty($inputData)) {
        echo json_encode(["ERRO" => "Nenhum dado enviado para atualização."]);
        exit;
    }

    include_once dirname(__DIR__, 1) . '/model/products.php';

    $inputData['updated_at'] = Product::getCurrentDateTime();

    $validation = Product::validate($inputData);
    if (!empty($validation)) {
        echo json_encode(["ERRO" => $validation]);
        exit;
    }

    $sql = "UPDATE ps_products SET ";
    $contador = 1;
    foreach (array_keys($inputData) as $key) {
        if (count($inputData) > $contador) {
            $sql .= "$key = ?, ";
        } else {
            $sql .= "$key = ? ";
        }
        $contador++;
    }
    $sql .= "WHERE id = ?";

    $db = DB::connect();
    $rs = $db->prepare($sql);
    $exec = $rs->execute(array_merge(array_values($inputData), [$param]));

    if ($exec) {
        echo json_encode(["dados" => "Produto atualizado com sucesso."]);
    } else {
        echo json_encode(["dados" => "Erro ao atualizar produto."]);
    }
}