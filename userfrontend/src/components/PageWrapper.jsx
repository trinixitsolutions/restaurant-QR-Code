import { motion } from "framer-motion";

export default function PageWrapper({ children, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, scale: 0.95, filter: "blur(5px)" }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
