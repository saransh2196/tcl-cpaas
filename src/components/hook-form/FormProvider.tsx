import React, { FC, ReactNode, useState } from 'react';
// form
import { FormProvider as Form } from 'react-hook-form';

interface FormProviderProps {
  children?: ReactNode;
  methods?: any,
  onSubmit: any
}

export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
