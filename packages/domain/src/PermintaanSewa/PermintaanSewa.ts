import { StatusPermintaan, PermintaanSewaType } from "./PermintaanSewa.types"

export class PermintaanSewa {
    constructor(public props: PermintaanSewaType) { }

    getId() {
        return this.props.idPermintaan
    }

    getDurasi() {
        return this.props.durasi
    }

    getLokasi() {
        return this.props.lokasi
    }

    getStatus() {
        return this.props.status
    }

    ubahStatus(statusBaru: StatusPermintaan) {
        this.props.status = statusBaru
    }
}