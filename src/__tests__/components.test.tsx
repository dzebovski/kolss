import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {KitchenCard} from '@/src/components/cards/kitchen-card';

describe('KitchenCard', () => {
  it('renders formatted price from number', () => {
    render(
      <KitchenCard
        currency="USD"
        locale="en-US"
        price={1200}
        style="Loft"
        title="Test Kitchen"
      />
    );

    expect(screen.getByTestId('kitchen-price')).toHaveTextContent('$1,200');
  });

  it('renders style badge', () => {
    render(
      <KitchenCard
        currency="USD"
        locale="en-US"
        price={1200}
        style="Modern"
        title="Test Kitchen"
      />
    );

    expect(screen.getByTestId('kitchen-style-badge')).toHaveTextContent('Modern');
  });
});
