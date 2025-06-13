import { Outfit, Poppins, Prata } from 'next/font/google';

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const prata = Prata({
  subsets: ['latin'],
  variable: '--font-prata',
  weight: ['400'] // Prata only has regular weight
});