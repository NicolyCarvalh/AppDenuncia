import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel";


class ColetaModel extends RegistroModel{

    litros: number;
    retorno: number;
    galoes: number;
    obs: string;

    constructor(codigo_usuario: any, data: Timestamp, localizacao: GeoPoint,
        litros: number, retorno: number, galoes: number, obs: string){
        super(codigo_usuario, data, localizacao);

        this.litros = litros;
        this.retorno = retorno;
        this.galoes = galoes;
        this.obs = obs;
    }   




}


export default ColetaModel;
