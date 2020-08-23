import React, { useRef } from 'react';
import { ApiResponse } from './useApi';
import { ErrorBar } from './errorBar/ErrorBar';
import { roundedInterval } from '../utils/time';
import { Loader } from './loader/Loader';

interface OwnProps<T> {
  children: React.ReactElement[] | React.ReactElement | any;
  response: ApiResponse<T>;
}

export const LoaderWrapper = (props: OwnProps<any>) => {
  const previousChildren = useRef(props.children);
  const lastSuccessfulLoad = useRef(new Date());

  switch (props.response?.status) {
    case 'loading':
      return <>
        <Loader />
        { previousChildren.current }
      </>;
    case 'failed':
      return <>
        <ErrorBar>Har ikke hentet nye data på {roundedInterval(lastSuccessfulLoad.current, new Date())}</ErrorBar>
        { previousChildren.current }
      </>;
    case 'success':
      previousChildren.current = props.children;
      lastSuccessfulLoad.current = new Date();
      return <>{props.children}</>;
    default:
      throw new Error('Unknown response status' + props.response?.status);
  }
};
