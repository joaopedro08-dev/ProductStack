<?php

class Product {
    public $id;
    public $name;
    public $brand;
    public $category;
    public $price;
    public $created_at;
    public $updated_at;

   public function __construct($id, $name, $brand, $category, $price, $created_at, $updated_at) {
        $this->id = $id;
        $this->name = $name;
        $this->brand = $brand;
        $this->category = $category;
        $this->price = $price;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public static function validate($data) {
        $errors = [];
        if (empty($data['name'])) {
            $errors['name'] = 'Nome é obrigatório.';
        }
        if (empty($data['brand'])) {
            $errors['brand'] = 'Marca é obrigatória.';
        }
        if (empty($data['category'])) {
            $errors['category'] = 'Categoria é obrigatória.';
        }
        if (!isset($data['price']) || !is_numeric($data['price']) || $data['price'] < 0) {
            $errors['price'] = 'Preço deve ser um número positivo.';
        }
        return $errors;
    }

    public static function getCurrentDateTime() {
        return date('Y-m-d H:i:s');
    }
}