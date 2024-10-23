import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Download } from 'lucide-react';

interface ConverterFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  downloadUrl: string;
}

export function ConverterForm({ onSubmit, loading, downloadUrl }: ConverterFormProps) {
  const [url, setUrl] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-2">
            {t('urlLabel')}
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('urlPlaceholder')}
            className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 px-4 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? t('converting') : t('convert')}
        </button>
      </form>

      {downloadUrl && (
        <div className="mt-6 text-center">
          <p className="mb-4">{t('downloadReady')}</p>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center gap-2 bg-green-500 py-2 px-6 rounded-lg hover:bg-green-600 transition"
          >
            <Download className="w-5 h-5" />
            {t('download')}
          </a>
        </div>
      )}
    </div>
  );
}