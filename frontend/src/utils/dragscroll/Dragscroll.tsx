import React, { createRef, EventHandler, MouseEvent, } from 'react';
import styles from './Dragscroll.module.scss';
import classNames from 'classnames';

interface OwnProps {
    horizontal?: boolean;
    vertical?: boolean;
    scrollSpeed?: number;
    children: React.ReactElement[] | React.ReactElement;
}

export const Dragscroll = (props: OwnProps) => {
    const { children, horizontal = false, vertical = true, scrollSpeed = 1.4 } = props;
    let isDown = false, startY = 0, startX = 0, scrollTop = 0, scrollLeft = 0;
    const dragscrollable = createRef<HTMLDivElement>();

    const dragStart: EventHandler<MouseEvent<HTMLDivElement>> = (e: MouseEvent<HTMLDivElement>) => {
        isDown = true;
        startY = e.pageY - dragscrollable!.current!.offsetTop;
        startX = e.pageX - dragscrollable!.current!.offsetLeft;
        scrollTop = dragscrollable!.current!.scrollTop;
        scrollLeft = dragscrollable!.current!.scrollLeft;
    };

    const dragging: EventHandler<MouseEvent<HTMLDivElement>> = (e: MouseEvent<HTMLDivElement>) => {
        if(!isDown) return;

        if (vertical) {
            const endY = e.pageY - dragscrollable!.current!.offsetTop;
            const scrollDistanceY = (startY - endY) * scrollSpeed;
            const newPositionY = scrollTop + scrollDistanceY;
            dragscrollable!.current!.scrollTo({ top: newPositionY, behavior: 'auto' });
        }

        if (horizontal) {
            const endX = e.pageX - dragscrollable!.current!.offsetLeft;
            const scrollDistanceX = (startX - endX) * scrollSpeed;
            const newPositionX = scrollLeft + scrollDistanceX;
            dragscrollable!.current!.scrollTo({ left: newPositionX, behavior: 'auto' });
        }
    };

    const dragStop: EventHandler<MouseEvent<HTMLDivElement>> = (e: MouseEvent<HTMLDivElement>) => {
        isDown = false;
    };

    return <div ref={dragscrollable}
                className={classNames(styles.dragscroll, {
                    [styles.horizontal]: horizontal,
                    [styles.vertical]: vertical
                })}
                onMouseDown={dragStart}
                onMouseMove={dragging}
                onMouseLeave={dragStop}
                onMouseUp={dragStop}>
        {children}
    </div>;
};
