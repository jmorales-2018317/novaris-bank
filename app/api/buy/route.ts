import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import Buy from "@/app/models/Buy";
import User from "@/app/models/User";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud como JSON
    const json = await request.json();
    console.log({ DataRequest: json });

    // Crear un nuevo objeto de cuenta bancaria con los datos parseados
    const buy = new Buy(json);
    console.log({ BuyCreated: buy });

    // Guardar el objeto de cuenta bancaria en la base de datos
    const savedBuy = await buy.save();

    // Devolver un objeto NextResponse con los datos de la cuenta bancaria guardada y un código de estado 200
    return new NextResponse(JSON.stringify(savedBuy), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // Si hay algún otro error, devolver un objeto NextResponse con un mensaje de error y un código de estado 500
    const error = {
      message: "Error al ejecutar la transferencia.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
