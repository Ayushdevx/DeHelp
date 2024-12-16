// "use client";

// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

// const links = [
//   { href: "/", label: "Home" },
//   { href: "/features", label: "Features" },
//   { href: "/about", label: "About" },
//   { href: "/community", label: "Community" },
// ];

// export function NavLinks() {
//   const pathname = usePathname();

//   return (
//     <>
//       {links.map((link, index) => (
//         <motion.div
//           key={link.href}
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//         >
//           <Link
//             href={link.href}
//             className={cn(
//               "brand-text text-sm tracking-wider transition-colors hover:text-primary",
//               pathname === link.href
//                 ? "text-foreground"
//                 : "text-muted-foreground"
//             )}
//           >
//             {link.label}
//           </Link>
//         </motion.div>
//       ))}
//     </>
//   );
// }