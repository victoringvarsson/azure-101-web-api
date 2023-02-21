import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface HttpResponse {
  status: number;
  headers?: { [key: string]: string | string[] };
  body?: unknown;
}

interface Image {
  id: string;
  uri: string;
  thumbnail: string;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
): Promise<void> {
  const images: Array<Image> = context.bindings.allimagesdoc.map(
    (item: { id: string; uri: string, thumbnail: string }) => {
      return {
        id: item.id,
        uri: item.uri,
        thumbnail: item.thumbnail
      };
    }
  );

  const res: HttpResponse = {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
    body: images,
  };

  context.res = res;
};

export default httpTrigger;
