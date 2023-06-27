import { IRoute } from "./route"
import { ITerminal } from "./terminal"

export interface INewMerchant {
    name: string
    bankName: string
    bankAccountName: string
    bankAccountNumber: string
    bankBranchCode: string
    merchantExternalId: string
}

export interface IMerchant {
    externalId: string
    name: string
    bankName: string
    bankAccountName: string
    bankAccountNumber: string
    bankBranchCode: string
}

export interface IMerchantDetails extends IMerchant {
    routes: IRoute[]
    terminals: ITerminal[]
}

export interface IMerchantData extends IMerchant  {
    terminalsCount: number
    routes: IRoute[]
    createdAt: string
}

