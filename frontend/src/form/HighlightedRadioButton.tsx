import React from 'react';
import styles from './HighlightedRadioButton.module.scss';

interface OwnProps {
  name: string;
  value: string;
  displayStyle: keyof typeof styleMapping;
  label?: string;
  defaultChecked?: boolean;
}

type Props = OwnProps;

const styleMapping = {
  styleEmojiSelector: styles.styleEmojiSelector,
  styleText: styles.styleText
};

export const HighlightedRadioButton = React.forwardRef<HTMLInputElement, OwnProps>((props: Props, ref) => {
  const {name, value, label = value, displayStyle, defaultChecked} = props;

  const buttonStyle = styleMapping[displayStyle];

  const id = `radio-${name}-${value}`;
  return <span className={styles.highlightedRadioButton + ' ' + buttonStyle}>
    <input className={styles.radioButton} id={id} name={name} value={value} type="radio" defaultChecked={defaultChecked} ref={ref} />
    <label htmlFor={id}>{label}</label>
  </span>;
});
