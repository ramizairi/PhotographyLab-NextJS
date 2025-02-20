import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Camera, Eye } from 'lucide-react';
import { cloudonaryUrl } from '../../constant/Cloudinary';

export const AlbumHeader = ({ album }) => (
    <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-96 w-full"
    >
        <Image
            src={cloudonaryUrl + album.coverImage}
            alt={album.title}
            fill
            priority
            className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mx-auto max-w-7xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 text-5xl font-bold text-white"
                >
                    {album.title}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-6 text-gray-300"
                >
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        <span>{new Date(album.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Camera className="mr-2 h-5 w-5" />
                        <span>{album.images?.length || 0} photos</span>
                    </div>
                    <div className="flex items-center">
                        <Eye className="mr-2 h-5 w-5" />
                        <span>{album.views || 0} Views</span>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.header>
);
