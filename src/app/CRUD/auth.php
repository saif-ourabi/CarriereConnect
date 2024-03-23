<?php
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
require_once "../../../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$json_data = file_get_contents("php://input");
$jwt_token = json_decode($json_data,true);

function validate_jwt_token($jwt_token) {
    $key = "b605f5b6d783bd077d05de9373c4b08e";
    try {
        $decoded = JWT::decode($jwt_token["jwt_token"], new Key($key, 'HS256'));
        return array("success" => true, "data" => $decoded);
    } catch (ExpiredException $e) {
        return array("success" => false, "error" => 'Token expired');
    } catch (SignatureInvalidException $e) {
        return array("success" => false, "error" => 'Invalid token signature');
    } catch (BeforeValidException $e) {
        return array("success" => false, "error" => 'Token not valid yet');
    } catch (Exception $e) {
        return array("success" => false, "error" => 'Invalid token: ' . $e->getMessage());
    }
}

try {
    $validation_result = validate_jwt_token($jwt_token);
    echo json_encode($validation_result);

} catch (Exception $e) {
    echo json_encode(array("success" => false, "error" => $e->getMessage()));
}
?>
