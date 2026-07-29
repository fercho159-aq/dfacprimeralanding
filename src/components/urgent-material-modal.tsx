
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import type { Dispatch, SetStateAction } from 'react';

interface UrgentMaterialModalProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export function UrgentMaterialModal({ isOpen, onOpenChange }: UrgentMaterialModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-bold">
            ¿Necesitas material urgente?
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-muted-foreground">
            Nuestro equipo está listo para atender tu pedido de inmediato. ¡Contáctanos ahora!
          </p>
          <Button asChild size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
            <a href="https://wa.me/524421550415?text=Hola,%20necesito%20material%20urgente." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
              <WhatsAppIcon className="h-5 w-5" />
              Contactar por WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" className="w-full">
            <a href="tel:+524422517169" className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5" />
              Llamar ahora: (442) 251-7169
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

