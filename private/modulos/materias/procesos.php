  
<?php
include('../../Config/Config.php');
$materia = new materia($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$materia->$proceso($_GET['materia']);
print_r(json_encode($materia->respuesta));

class materia{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];

    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($materia){
        $this->datos = json_decode($materia, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['codigo'])){
            $this->respuesta['msg'] = 'por favor ingrese el codigo de la catedra';
        }
        if( empty($this->datos['nombre'])){
            $this->respuesta['msg'] = 'por favor ingrese el nombre de la catedra';
        }
        if( empty($this->datos['ciclo'])){
            $this->respuesta['msg'] = 'por favor ingrese el ciclo de la catedra';
        }
        $this->almacenar_materia();
    }
    private function almacenar_materia(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO materias (codigo,nombre,ciclo) VALUES(
                        "'. $this->datos['codigo'] .'",
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['ciclo'] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                   UPDATE materias SET
                        codigo     = "'. $this->datos['codigo'] .'",
                        nombre     = "'. $this->datos['nombre'] .'",
                        ciclo      = "'. $this->datos['ciclo'] .'"
                    WHERE idMateria = "'. $this->datos['idMateria'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarMateria($valor = ''){
        $this->db->consultas('
            select materias.idMateria, materias.codigo, materias.nombre, materias.ciclo
            from materias
            where materias.codigo like "%'. $valor .'%" or materias.nombre like "%'. $valor .'%" or materias.ciclo like "%'. $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }
    public function eliminarMateria($idMateria=''){
        $this->db->consultas('
            delete materias
            from materias
            where materias.idMateria = "'.$idMateria.'"
        ');
        $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>