export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Salla Webhook:", body);

    return Response.json({
      success: true,
      message: "Webhook received successfully",
      data: body,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Invalid webhook data",
      },
      { status: 400 }
    );
  }
}
