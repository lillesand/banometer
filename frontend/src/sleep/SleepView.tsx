import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './sleep.scss';

export interface SleepHistoryProps {
  previous: string;
}

export const SleepView = () => {
  const history = useHistory<SleepHistoryProps>();

  return <div className="sleep">
    <Link to={history.location.state.previous} className="full-screen-emoji" role="img" aria-label="sleeping">😴</Link>
  </div>
 };
