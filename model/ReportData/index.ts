import { GeoPoint, Timestamp } from "firebase/firestore";
import DataInfo from "../DataInfo";

class ReportData extends DataInfo{
    info_1: any;
    info_2: any;
    info_3: any;
    localizacao: GeoPoint;
    ocorrencia: number;

    constructor(codigo_usuario: string, data: Timestamp,info_1: any, info_2: any, info_3: any, localizacao: GeoPoint, ocorrencia: number){
        super(codigo_usuario, data)

        this.info_1 = info_1;
        this.info_2 = info_2;
        this.info_3 = info_3;
        this.localizacao = localizacao;
        this.ocorrencia = ocorrencia;
    }
}

export default ReportData;