"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const ServerSetupCard = () => {
    const { onOpen } = useModal();
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Set Up a Server</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Click the button below to set up a new server.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => onOpen("createServer")}>Create a Server</Button>
        </CardFooter>
      </Card>
    );
  };