import { forwardRef, useRef, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import { useSphere, useSpring, useBox } from '@react-three/cannon';

function Queue() {



    const box = useRef(null)
    const ball = useRef(null)
    const [, , api] = useSpring(box, ball, { damping: 1, restLength: 2, stiffness: 100 })
    const [isDown, setIsDown] = useState(false)

    useEffect(() => api.setRestLength(isDown ? 0 : 2), [isDown])

    return (
        <group onPointerDown={() => setIsDown(true)} onPointerUp={() => setIsDown(false)}>
            <Ball ref={ball} position={[-1, 0, 0]} />
        </group>
    )



}

export default Queue;