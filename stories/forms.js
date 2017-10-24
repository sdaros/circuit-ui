import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from 'recompose';
import { action } from '@storybook/addon-actions';
import {
  ValidatedInput,
  ValidatedSelect,
  Form,
  onChangeForm,
  createFormState
} from '..';

const INITIAL_STATE = createFormState(['name', 'fruit', 'color'], {
  values: {
    fruit: 'apples'
  },
  validations: {
    name: { required: true },
    fruit: { required: true },
    color: { required: false }
  },
  messages: {
    name: { required: 'Your name is required' },
    fruit: { required: 'Your favorite fruit is required' }
  }
});

const withFormState = withState('data', 'onUpdate', INITIAL_STATE);

storiesOf('Forms', module)
  .add('ValidatedInput', () => {
    const MyInputForm = withFormState(({ data, onUpdate }) => (
      <Form
        data={data}
        onChange={newData =>
          onUpdate(prevData => onChangeForm(prevData, newData))}
        onSubmit={action('onSubmit')}
      >
        <ValidatedInput field="name" label="My name" />
        <ValidatedInput
          field="fruit"
          label="My favorite fruit"
          disabled={true}
        />
        <ValidatedInput field="color" label="My favorite color" />
      </Form>
    ));
    return <MyInputForm />;
  })
  .add('ValidatedSelect', () => {
    const MySelectForm = withFormState(({ data, onUpdate }) => (
      <Form
        data={data}
        onChange={newData =>
          onUpdate(prevData => onChangeForm(prevData, newData))}
        onSubmit={action('onSubmit')}
      >
        <ValidatedSelect field="name" label="Your name">
          <option value="">Pick your name</option>
          <option value="Heinz">Heinz</option>
          <option value="Heinrich">Heinrich</option>
          <option value="Helga">Helga</option>
        </ValidatedSelect>
        <ValidatedSelect
          field="fruit"
          label="Your favorite fruit"
          disabled={true}
        >
          <option value="">Pick a fruit</option>
          <option value="apples">Apples</option>
          <option value="bananas">Bananas</option>
          <option value="fruit loops">Fruit loops</option>
        </ValidatedSelect>
        <ValidatedSelect field="color" label="Your favorite color">
          <option value="">Pick a color</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </ValidatedSelect>
      </Form>
    ));
    return <MySelectForm />;
  });
