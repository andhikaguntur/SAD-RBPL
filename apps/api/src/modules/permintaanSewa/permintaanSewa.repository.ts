import { PermintaanSewaType } from "@domain/PermintaanSewa/PermintaanSewa.types"

const permintaanTable = new Map<string, PermintaanSewaType>()

export class PermintaanRepository {

    async findById(id: string) {
        return permintaanTable.get(id) ?? null
    }

}