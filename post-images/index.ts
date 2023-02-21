import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 } from "uuid";

interface HttpResponse {
  status: number;
  headers?: { [key: string]: string | string[] };
  body?: unknown;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const id = v4();
  const blockBlobClient = BlobServiceClient.fromConnectionString(
    process.env.victorimagestore_CONNECTION_STRING
  )
    .getContainerClient("images")
    .getBlockBlobClient(`${id}`);

  await blockBlobClient.uploadData(req.body);
  const account = "victorimagestore";

  const POST_BODY = {
    id,
    uri: `https://${account}.blob.core.windows.net/images/${id}`,
  };

  context.bindings.postimages = POST_BODY;
  context.bindings.messageservicebus = POST_BODY;

  const res: HttpResponse = {
    status: 201,
    headers: {
      "content-type": "application/json",
    },
    body: POST_BODY,
  };

  context.res = res;
};

export default httpTrigger;
