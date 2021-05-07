export class PaymentDetails {
    ccname:string
    ccnumber:string
    ccexpiration:string
    cccvv:string
  
    constructor(ccname: string, ccnumber: string, ccexpiration: string, cccvv: string) {
      this.ccname = ccname;
      this.ccnumber = ccnumber;
      this.ccexpiration = ccexpiration;
      this.cccvv = cccvv;
    }
  }
  