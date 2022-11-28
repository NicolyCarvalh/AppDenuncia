import { GeoPoint, Timestamp } from "firebase/firestore";
import RegistroModel from "../RegistroModel"

class LocalModel extends RegistroModel {

    nome: string;
    ponto_referencia: string;
    contato: string;
    telefone: string;
    retorno: number;
    obs: string;

    constructor(codigo_usuario: string, data: Timestamp, localizacao: GeoPoint,
        nome: string,
        ponto_referencia: string,
        contato: string,
        telefone: string,
        retorno: number,
        obs: string) {
        super(codigo_usuario, data, localizacao);

        this.nome = nome;
        this.ponto_referencia = ponto_referencia;
        this.contato = contato;
        this.telefone = telefone;
        this.retorno = retorno;
        this.obs = obs;
    }



}

export default LocalModel;