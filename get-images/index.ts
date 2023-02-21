import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

interface HttpResponse {
  status: number;
  headers?: { [key: string]: string | string[] };
  body?: unknown;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const account = "victorimagestore";
  const container = "images";
  const id = req.params.id;
  const imageBody = {
    id,
    uri: `https://${account}.blob.core.windows.net/${container}/${id}`,
  };

  context.bindings.getimages = imageBody;

  const res: HttpResponse = {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
    body: imageBody,
  };

  context.res = res;
};

export default httpTrigger;
