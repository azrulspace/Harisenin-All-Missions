import React from 'react';

/**
 * Komponen pembungkus (wrapper) Card yang bisa digunakan berulang kali.
 * Ini disebut komponen "reusable" (dapat digunakan kembali).
 * 
 * @param {object} props 
 * @param {React.ReactNode} props.children - Konten apa pun yang dimasukkan ke dalam Card
 * @param {string} props.className - Kelas CSS tambahan jika diperlukan
 */
const Card = ({ children, className = '' }) => {
  return (
    // Kita menggabungkan styling default (bg-white, rounded-2xl, dsb) dengan className tambahan
    // menggunakan template literal (backticks `...`)
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      
      {/* children ini akan merender apapun yang ditaruh di antara <Card> ... </Card> */}
      {children}
      
    </div>
  );
};

export default Card;
