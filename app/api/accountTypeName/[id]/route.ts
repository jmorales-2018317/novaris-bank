import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import AccountType from "@/app/models/AccountType";

dbConnect();

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  console.log({ACCOUNT_TYPE: id});

  try {
    const account = await AccountType.findOne({ name: id });

    console.log({ACCOUNT: account});

    if (!account) {
      return new NextResponse(JSON.stringify("Account Type not found"), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify(account), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
