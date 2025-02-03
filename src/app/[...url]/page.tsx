interface PageProps {
    params: Promise<{
        url: string | string[] | undefined;
    }>;
}

const Page = async ({ params }: PageProps) => {
    const resolvedParams = await params; // Await the params object
    console.log('params:', resolvedParams.url);

    return <div> HELLO </div>;
};

export default Page;
