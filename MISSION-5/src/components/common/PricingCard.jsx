import React from 'react';
import Card from './Card';
import Button from './Button';
import { CheckCircle2 } from 'lucide-react';

const PricingCard = ({ title, price, features, isPopular, buttonText = "Pilih Paket" }) => {
  return (
    <Card className={`relative p-8 flex flex-col h-full ${isPopular ? 'border-2 border-primary-500 shadow-lg' : 'border border-gray-200'}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Paling Populer
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          {price !== 'Custom' && price !== 'Gratis' && (
            <span className="text-gray-500 ml-1">/bulan</span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-secondary-500 shrink-0 mr-3" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button 
          variant={isPopular ? 'primary' : 'outline'} 
          fullWidth 
          size="lg"
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default PricingCard;
