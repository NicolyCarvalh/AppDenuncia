import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class CidadaoModel extends RegistroModel{

    sexo: string;
    description: string;
    peso: number;

    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        sexo: string,
        description: string,
        peso: number){
        super(codigo_usuario, data, localizacao);

        this.sexo = sexo;
        this.description = description;
        this.peso = peso;
    }



}

export default CidadaoModel;