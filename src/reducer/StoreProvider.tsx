import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import Store from './base-reducer';

interface Props {
  children: ReactNode;
}

export function StoreProvider({ children }: Props) {
  return <Provider store={Store}>{children}</Provider>;
}
