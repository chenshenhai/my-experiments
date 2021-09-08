import * as React from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

export default function App() {

  const { t, i18n } = useTranslation();
  return (
    <div className="app">
      Hello App
    </div>
  )
}