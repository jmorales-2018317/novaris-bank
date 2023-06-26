"use server";
import dbConnect from "@/app/db/connection";
import { BankAccount, IBankAccount } from "@/app/models/BankAccount";
import { revalidatePath } from "next/cache";

export async function deleteBankAccount(_id: any) {
  console.log({ serverID: _id });
  try {
    dbConnect();
    const bankAccount = await BankAccount.findById(_id);

    if (!bankAccount) {
      return new Error("No user found");
    }

    const deletedBankAccount = await BankAccount.findByIdAndDelete(_id);

    console.log({ BANK_ACCOUNT_DELETED: deletedBankAccount });

    revalidatePath("/console/Accounts");
  } catch (err) {
    console.log(err);
  }
}

export async function getBankAccounts() {
  const res = await fetch(`http://localhost:3000/api/bankAccount`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const bankAccount: IBankAccount[] = await res.json();

  console.log(bankAccount)

  return bankAccount;
}

export async function getBankAccountById(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/bankAccount/${_id}`, {
      method: 'GET',
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const bankAccount = await res.json();

    return bankAccount
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getAccountById(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/accountType/${_id}`, {
      method: 'GET',
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const account = await res.json();

    return account.createdAt;
  } catch (err) {
    console.log(err);
    return err;
  }
}
