import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { describe, expect, it } from 'vitest';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import messages from '@/i18n/messages/en.json';

function renderWithProviders(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ThemeProvider attribute="data-theme">{ui}</ThemeProvider>
    </NextIntlClientProvider>,
  );
}

describe('ThemeToggle', () => {
  it('renders an accessible theme control', () => {
    renderWithProviders(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /Theme/i })).toBeInTheDocument();
  });
});
