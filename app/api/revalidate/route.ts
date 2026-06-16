import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json({ message: "Revalidation not configured" }, { status: 501 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad request: missing _type", { status: 400 });
    }

    const revalidated: string[] = [];
    const touch = (path: string) => {
      revalidatePath(path);
      revalidated.push(path);
    };

    const slug = body.slug?.current;

    switch (body._type) {
      case "company":
        touch("/");
        touch("/portfolio");
        if (slug) touch(`/portfolio/${slug}`);
        break;
      case "insight":
        touch("/insights");
        if (slug) touch(`/insights/${slug}`);
        break;
      case "venture":
        touch("/ventures");
        break;
      case "teamMember":
        touch("/about");
        break;
      default:
        touch("/");
    }

    return NextResponse.json({ revalidated, now: Date.now() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(message, { status: 500 });
  }
}
