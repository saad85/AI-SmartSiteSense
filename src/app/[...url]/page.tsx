import { ChatWrapper } from "../../components/ChatWrappper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";

interface PageProps {
    params: Promise<{
        url: string | string[] | undefined;
    }>;
}

const reconstructedUrl = ({ urls } : { urls: string[] }): string  => {
 const decodedComponents =  urls.map((component) => decodeURIComponent(component) )
 return decodedComponents?.join('/')
}

const Page = async ({ params }: PageProps) => {
    const resolvedParams = await params; // Await the params object
    console.log('params:', resolvedParams.url);

    const reConstructedUrl = reconstructedUrl( { urls: resolvedParams.url as string[] } )
    console.log('reConstructedUrl:', reConstructedUrl);

    const isAlreadyindexed = await redis.sismember("indexed-urls", reConstructedUrl)
    console.log('isAlreadyindexed ', isAlreadyindexed)

    if(!isAlreadyindexed) {
        const response = await ragChat.context.add({
            type: "html",
            source: reConstructedUrl,
            config: { chunkOverlap: 50, chunkSize: 200 },
          });
    
          console.log('response:', response);

          redis.sadd("indexed-urls", reConstructedUrl)
    }

    return <ChatWrapper sessionId="mock"/>;
};

export default Page;
