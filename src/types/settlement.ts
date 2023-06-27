export interface ISettlement {
  amountPayable: number;
  atmoneyCost: number;
  externalId: string;
  grossCommission: number;
  mtnCost: number;
  netCommission: number;
  processorCommission: number;
  routeCount: string;
  status: string;
  transactionCount: number;
  transactionValue: number;
  vodafoneCashCost: number;
}


export interface IUploadedSettlement {
  amountPayable: number;
  externalId: string;
  grossCommission: number;
  merchantCount: number;
  netCommission: number;
  processorCommission: number;
  routeCount: number;
  settledAt: null | Date;
  status: "queued" | "pending" |  "settled";
  transactionCount: number;
  transactionValue: number;
}


export interface ISettlementSummary {
  amountPayable: number 
  grossCommission: number 
  netCommission: number 
  processorCommission: number 
  routeCount: number 
  transactionCount: number 
  transactionValue: string
}


export interface ISettlementMerchants {
  atmoneyCost: number;
  mtnCost: number;
  vodafoneCashCost: number;
  amountPayable: number;
  externalId: string;
  grossCommission: number;
  name: string;
  netCommission: number;
  processorCommission: number;
  routeCount: number;
  settledAt: null | string;
  transactionCount: number;
  transactionValue: number;
}

export interface ISettlementRoutes {
  amountPayable: number;
  grossCommission: number;
  netCommission: number;
  processorCommission: number;
  rSwitch: string;
  transactionCount: number;
  transactionValue: number | string;

}

export interface ISettlementDetails {
  canRollback: boolean
  summary: ISettlementSummary
  merchants: ISettlementMerchants[]
  routes: ISettlementRoutes[]

}
