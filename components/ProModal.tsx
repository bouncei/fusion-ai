import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { tools } from "@/constants";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";

const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const respone = await axios.get("/api/stripe");

      window.location = respone.data.url;
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center  flex-col gap-y-4 pb-2">
          <DialogTitle className="flex items-center gap-x-2 font-bold py-1">
            Upgrade to FusionAI
            <Badge variant="premium" className="uppercase text-sm py-1 ">
              pro
            </Badge>
          </DialogTitle>

          <DialogDescription className="text-center pt-2 space-y-2">
            <p className="text-sm">
              Unlock the full potential of FusionAI with our Pro plan. Get
              access to advanced features, priority support, and more.
            </p>

            {tools.map((tool) => (
              <Card
                key={tool.href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>

                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>

                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => onSubscribe()}
            size="lg"
            disabled={loading}
            variant="premium"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
