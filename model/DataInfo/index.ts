import { Timestamp } from "firebase/firestore";

class DataInfo{
    codigo_usuario: string;
    data: Timestamp;


    constructor(codigo_usuario: string, data: Timestamp){
        this.codigo_usuario = codigo_usuario;
        this.data = data;
    }
}

export default DataInfo;