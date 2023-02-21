import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface HttpResponse {
  status: number;
  headers?: { [key: string]: string | string[] };
  body?: unknown;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const res: HttpResponse = {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
    body: {
      text: "This is the joke. Haha.",
    },
  };
  context.res = res;
};

export default httpTrigger;
