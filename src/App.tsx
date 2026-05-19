/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Kana from './pages/Kana';
import Kanji from './pages/Kanji';
import Vocabulary from './pages/Vocabulary';
import Grammar from './pages/Grammar';
import Quiz from './pages/Quiz';
import Certification from './pages/Certification';
import Notes from './pages/Notes';
import Themes, { applyTheme } from './pages/Themes';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('nihongo_theme') || 'default';
    applyTheme(savedTheme);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} />;
      case 'kana':
        return <Kana />;
      case 'kanji':
        return <Kanji />;
      case 'vocabulary':
        return <Vocabulary />;
      case 'grammar':
        return <Grammar />;
      case 'quiz':
        return <Quiz />;
      case 'certification':
        return <Certification />;
      case 'notes':
        return <Notes />;
      case 'themes':
        return <Themes />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

