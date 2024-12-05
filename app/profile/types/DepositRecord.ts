interface DepositRecord {
  id: number;
  method: string;
  amount: number;
  date: string;
  status: "success" | "processing";
}
