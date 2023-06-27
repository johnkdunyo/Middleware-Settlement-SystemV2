export interface INewRoute {
    routeExternalId: string;
    percentageFee: number;
    minCapAmount: number;
    minCapAmountFee: number;
    maxCapAmount: number;
    maxCapAmountFee: number;
}


export interface INewRouteErrorObject {
    routeExternalId: string;
    percentageFee: string;
    minCapAmount: string;
    minCapAmountFee: string;
    maxCapAmount: string;
    maxCapAmountFee: string;
}

export interface IRoute {
    externalId: string; 
    name: string;
    rSwitch: string;
    percentageFee: number;
    minCapAmount: number;
    minCapAmountFee: number;
    maxCapAmount: number;
    maxCapAmountFee: number;
}

export interface IServerRoute extends IRoute {
    defaultMaxCapAmount: number 
    defaultMaxCapAmountFee: number 
    defaultMinCapAmount: number 
    defaultMinCapAmountFee: number 
    defaultPercentageFee: number 
    merchant?: any
}