
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import type { Dispatch, SetStateAction } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const phoneNumbers = [
  { display: "(442) 251 7169", tel: "+524422517169" },
  { display: "(442) 251 7168", tel: "+524422517168" },
  { display: "(442) 155 0415", tel: "+524421550415" },
  { display: "(55) 4613-4738", tel: "+525546134738" },
];

export function ContactModal({ isOpen, onOpenChange }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-bold">Contacta con un asesor en Querétaro</DialogTitle>
          <DialogDescription>
            Elige tu método de contacto preferido. Nuestro equipo está listo para ayudarte.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
           <h3 className="text-sm font-medium text-muted-foreground text-center">Llamar a oficina</h3>
          {phoneNumbers.map((phone, index) => (
             <Button key={index} asChild size="lg" className="w-full">
              <a href={`tel:${phone.tel}`} className="flex items-center justify-center gap-3">
                <Phone className="h-5 w-5" />
                Llamar a {phone.display}
              </a>
            </Button>
          ))}
          
           <h3 className="text-sm font-medium text-muted-foreground text-center pt-3">Enviar mensaje</h3>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <a href="https://wa.me/524421550415?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización%20para%20puntales." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
              <WhatsAppIcon className="h-5 w-5" />
              Enviar WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
