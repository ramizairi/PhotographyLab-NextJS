import { Share2, X } from 'lucide-react';
import { motion, AnimatePresence, Eye } from 'framer-motion';

export const Controls = ({ currentIndex, total, isPlaying, onPlayToggle, onShare, onClose }) => (
    <div className="flex items-center justify-between p-4">
        <div className="text-lg font-medium text-white">
            {currentIndex + 1} / {total}
        </div>
        <div className="flex items-center space-x-6">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onPlayToggle}
                className="text-white transition-colors hover:text-blue-400"
            >
                {isPlaying ? "Pause" : "Play"}
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onShare}
                className="text-white transition-colors hover:text-blue-400"
            >
                <Share2 size={24} />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white transition-colors hover:text-red-400"
            >
                <X size={24} />
            </motion.button>
        </div>
    </div>
);