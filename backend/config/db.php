<?php

require_once dirname(__DIR__, 1) . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(dirname(__DIR__, 1));
$dotenv->load();

define('DB_HOST', $_ENV['DB_HOST']); if (!defined('DB_HOST')) {
    die("Configuração de banco de dados não encontrada.");
}
define('DB_NAME', $_ENV['DB_NAME']); if (!defined('DB_NAME')) {
    die("Configuração de banco de dados não encontrada.");
}
define('DB_USER', $_ENV['DB_USER']); if (!defined('DB_USER')) {
    die("Configuração de banco de dados não encontrada.");
}
define('DB_PASS', $_ENV['DB_PASS']); if (!defined('DB_PASS')) {
    die("Configuração de banco de dados não encontrada.");
}

class DB
{
    public static function connect()
    {
        $host = DB_HOST;
        $base = DB_NAME;
        $username = DB_USER;
        $password = DB_PASS;

        return new PDO("mysql:host=$host;dbname=$base;charset=utf8", $username, $password);
    }
}