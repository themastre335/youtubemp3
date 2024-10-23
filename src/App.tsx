import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './components/Header';
import { ConverterForm } from './components/ConverterForm';
import { FeatureGrid } from './components/FeatureGrid';
import { LanguageSelector } from './components/LanguageSelector';
import { useLanguage } from './contexts/LanguageContext';
import { convertVideo } from './lib/api';

function App() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  const handleConvert = async (url: string) => {
    try {
      setLoading(true);
      setError('');
      const result = await convertVideo(url);
      setDownloadUrl(result.downloadUrl);
    } catch (err) {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDescription')} />
        <meta property="og:title" content={t('seoTitle')} />
        <meta property="og:description" content={t('seoDescription')} />
        <meta name="twitter:title" content={t('seoTitle')} />
        <meta name="twitter:description" content={t('seoDescription')} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          
          <Header />
          
          <ConverterForm
            onSubmit={handleConvert}
            loading={loading}
            downloadUrl={downloadUrl}
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 text-center">
              {error}
            </div>
          )}

          <FeatureGrid />
        </div>
      </div>
    </>
  );
}

export default App;