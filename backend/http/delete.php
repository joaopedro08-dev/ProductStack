<?php

if ($action === '' && $param === '') {
    echo json_encode(["ERRO" => "Caminho não encontrado."]);
    exit;
}

if ($action === 'delete' && $param === '') {
    echo json_encode(["ERRO" => "ID do produto não fornecido para exclusão."]);
    exit;
}

if ($action === 'delete' && ($param !== '' && is_numeric($param))) {
    $db = DB::connect();
    $sql = "DELETE FROM ps_products WHERE id = ?";
    $rs = $db->prepare($sql);
    $exec = $rs->execute([$param]);

    if ($exec) {
        echo json_encode(["dados" => "Produto excluído com sucesso."]);
    } else {
        echo json_encode(["dados" => "Erro ao excluir produto."]);
    }
}