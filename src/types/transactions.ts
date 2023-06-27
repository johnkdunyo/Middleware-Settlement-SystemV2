export interface ITransaction {
    externalId: string;
    merchantNickname: string;
    stan: string;
    reference: string;
    type: string;
    accountNumber: string;
    rSwitch: string;
    amount: string;
    description: string;
    status: string;
    reason: string;
    processor: string;
    feeType: string;
    fee: number;
    feeCharged: number;
    netAmount: number;
    settledAt: null | Date;
}