// _app.tsx
import { Inter, Space_Grotesk, DM_Sans, Poppins, Montserrat } from "next/font/google";

// Importing fonts with specific weights
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, Semi-Bold, Bold
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"], // Medium, Semi-Bold, Bold
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"], // Medium, Semi-Bold, Bold
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"], // Medium, Semi-Bold, Bold
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["500", "600", "700"], // Medium, Semi-Bold, Bold
  });
  


export { inter, spaceGrotesk, dmSans, poppins, montserrat }