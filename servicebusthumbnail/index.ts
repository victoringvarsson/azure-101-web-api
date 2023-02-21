import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import resizeImg from "resize-img"

interface inputDocument {
    id: string,
    uri: string,
    thumbnail: string
}
const serviceBusQueueTrigger: AzureFunction = async function (
  context: Context,
  inputimage: inputDocument
): Promise<void> {
  context.log.warn("AM I ALIVE?")
  const account = "victorimagestore";
  const resizedImage = await resizeImg(context.bindings.inputimageblob, {
    width: 128, 
    height: 128
  })

  const POST_BODY = {
    ...inputimage,
    thumbnail: `https://${account}.blob.core.windows.net/thumbnail/${inputimage.id}`,
  };

  context.bindings.outputimage = POST_BODY
  context.bindings.outputimageblob = resizedImage
  
};

export default serviceBusQueueTrigger;
