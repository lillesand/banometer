import React from 'react';
import styles from './HighlightedRadioButton.module.scss';

interface OwnProps {
  name: string;
  value: string;
  style: keyof typeof styleMapping;
  label?: string;
  defaultChecked?: boolean;
}

type Props = OwnProps;

const styleMapping = {
  styleEmojiSelector: styles.styleEmojiSelector,
  styleText: styles.styleText
};

export const HighlightedRadioButton = React.forwardRef<HTMLInputElement, OwnProps>((props: Props, ref) => {
  const {name, value, label = value, style, defaultChecked} = props;

  const buttonStyle = styleMapping[style];

  const id = `radio-${name}-${value}`;
  return <span className={styles.highlightedRadioButton + ' ' + buttonStyle}>
    <input className={styles.radioButton} id={id} name={name} value={value} type="radio" defaultChecked={defaultChecked} ref={ref} />
    <label className={styles.highlightedLabel} htmlFor={id}>{label}</label>
  </span>;
});
