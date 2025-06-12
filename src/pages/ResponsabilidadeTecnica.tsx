
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ResponsabilidadeTecnica = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Responsabilidade Técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Esta página está em desenvolvimento.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsabilidadeTecnica;
