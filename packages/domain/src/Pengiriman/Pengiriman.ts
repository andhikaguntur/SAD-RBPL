import { PengirimanType } from "./Pengiriman.types";

export class Pengiriman {
    constructor(public props: PengirimanType) { }

    getId() {
        return this.props.id
    }
}