import { mesinType, StatusMesin } from "./mesin.types";

export class Mesin {
    public props: mesinType;

    constructor(props: mesinType) {
        this.props = props;
    }

    getStatus() {
        return this.props.status;
    }

    getId(){
        return this.props.idMesin
    }

   ubahStatus(statusBaru: StatusMesin) {
    this.props.status = statusBaru;
  }
}