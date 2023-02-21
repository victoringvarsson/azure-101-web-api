import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import resizeImg from "resize-img"

interface Message {
    id: string,
    uri: string,
}

interface Document extends Message {
  thumbnail?: string
}

const serviceBusQueueTrigger: AzureFunction = async function (
  context: Context,
  message: Message,
  document: Document,
  image: Buffer
): Promise<void> {
  context.log.warn("AM I ALIVE?")

  const account = "victorimagestore";
  const resizedImage = await resizeImg(image, {
    width: 128, 
    height: 128
  })

  document.thumbnail = `https://${account}.blob.core.windows.net/thumbnail/${message.id}`
  
  context.bindings.outputimage = document
  context.bindings.outputimageblob = resizedImage
};

export default serviceBusQueueTrigger;
