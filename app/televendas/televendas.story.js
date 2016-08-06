import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Televendas from './televendas-component'

storiesOf('Televendas', module)
  .add('with status', () => (
    <Televendas sessionStatus='some status' startNewSession={action('started new session')} />
  ))
  .add('with no status', () => (
    <Televendas startNewSession={action('started new session')} />
  ));