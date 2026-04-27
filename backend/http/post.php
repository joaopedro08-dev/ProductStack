<?php

if ($action === '' && $param === '') {
    echo json_encode(["ERRO" => "Caminho não encontrado."]);
    exit;
}

if ($action === 'create' && $param === '') {
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
        echo json_encode(["ERRO" => "Nenhum dado enviado para inserção."]);
        exit;
    }

    include_once dirname(__DIR__, 1) . '/model/products.php';

    $inputData['created_at'] = Product::getCurrentDateTime();
    $inputData['updated_at'] = Product::getCurrentDateTime();

    $validation = Product::validate($inputData);
    if (!empty($validation)) {
        echo json_encode(["ERRO" => $validation]);
        exit;
    }

    $sql = "INSERT INTO ps_products (";
    $contador = 1;
    foreach (array_keys($inputData) as $key) {
        if (count($inputData) > $contador) {
            $sql .= "$key, ";
        } else {
            $sql .= "$key";
        }
        $contador++;
    }

    $sql .= ") VALUES (";
    $contador = 1;
    foreach (array_values($inputData) as $value) {
        if (count($inputData) > $contador) {
            $sql .= "?, ";
        } else {
            $sql .= "?)";
        }
        $contador++;
    }

    $db = DB::connect();
    $rs = $db->prepare($sql);
    $exec = $rs->execute(array_values($inputData));

    if ($exec) {
        echo json_encode(["dados" => "Produto criado com sucesso."]);
    } else {
        echo json_encode(["dados" => "Erro ao criar produto."]);
    }
}
