import React, { createRef, EventHandler, MouseEvent, } from 'react';
import './dragscroll.scss';

interface OwnProps {
    children: React.ReactElement[] | React.ReactElement;
}

export const Dragscroll = (props: OwnProps) => {
    const { children } = props;
    let isDown = false, startY = 0, scrollTop = 0;
    const dragscrollable = createRef<HTMLDivElement>();

    const dragStart: EventHandler<MouseEvent<HTMLDivElement>> = (e: MouseEvent<HTMLDivElement>) => {
        isDown = true;
        startY = e.pageY - dragscrollable!.current!.offsetTop;
        scrollTop = dragscrollable!.current!.scrollTop;
    };

    const dragging: EventHandler<MouseEvent<HTMLDivElement>> = (e: MouseEvent<HTMLDivElement>) => {
        if(!isDown) return;
        const endY = e.pageY - dragscrollable!.current!.offsetTop;
        const scrollDistance = (startY - endY) * 1.4;
        const newPosition = scrollTop + scrollDistance;
        dragscrollable!.current!.scrollTo({ top: newPosition, behavior: 'auto' });
    };

    const dragStop: EventHandler<MouseEvent<HTMLDivElement>> = (e: MouseEvent<HTMLDivElement>) => {
        isDown = false;
    };

    return <div ref={dragscrollable}
                className="dragscroll"
                onMouseDown={dragStart}
                onMouseMove={dragging}
                onMouseLeave={dragStop}
                onMouseUp={dragStop}>
        {children}
    </div>;
};
