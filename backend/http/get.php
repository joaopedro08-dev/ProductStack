<?php
if ($action === '' && $param === '') {
    echo json_encode(["ERRO" => "Caminho não encontrado."]);
    exit;
}

if ($action === 'list' && $param === '') {
    $db = DB::connect();
    $rs = $db->prepare("SELECT * FROM ps_products ORDER BY name ASC");
    $rs->execute();
    $obj = $rs->fetchAll(PDO::FETCH_ASSOC);

    if ($obj) {
        echo json_encode(["dados" => $obj]);
    } else {
        echo json_encode(["dados" => "Nenhum produto encontrado."]);
    }
}

if ($action === 'list' && $param !== '') {
    $db = DB::connect();
    $rs = $db->prepare("SELECT * FROM ps_products WHERE id = :id");
    $rs->bindParam(':id', $param, PDO::PARAM_INT);
    $rs->execute();
    $obj = $rs->fetch(PDO::FETCH_ASSOC);

    if ($obj) {
        echo json_encode(["dados" => $obj]);
    } else {
        echo json_encode(["dados" => "Produto não encontrado."]);
    }
}
