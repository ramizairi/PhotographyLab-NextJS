// components/common/ImageNotFound.tsx
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo/logo-white.png";

const ImageNotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="flex flex-col items-center text-center">
                <Image
                    src={Logo}
                    alt="Logo"
                    width={200}
                    height={200}
                    className="mx-4"
                />
                <h1 className="mb-4 text-3xl font-bold">Image Not Found</h1>
                <p className="mb-8 text-gray-400">
                    The image you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    href="/"
                    className="rounded border-[1px] border-red-700 bg-transparent px-6 py-3 text-white transition hover:bg-red-700"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ImageNotFound;
