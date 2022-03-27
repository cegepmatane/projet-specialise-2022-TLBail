import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TextureLoader, Vector2 } from 'three';

import { useCompoundBody, useSphere } from '@react-three/cannon'

function PoolBall({ position, textureURL }) {


    const ballTexture = useMemo(() => new TextureLoader().load(textureURL), [
        textureURL
    ]);

    const [ref, api] = useSphere(() => ({
        args: [0.5],
        mass: 0.2,
        position,
    }));


    return (
        <mesh ref={ref} position={position} speed={new Vector2()} castShadow
            onClick={() => {
                api.applyImpulse([0, 0, 100], [0, 0, 0])
            }}
        >
            <sphereGeometry attach='geometry' args={[0.5, 128, 128]} />
            <meshStandardMaterial
                attach='material'
                color={0xffffff}
                roughness={0.25}
                metalness={0}
                map={ballTexture}
            />
        </mesh>
    );
}

PoolBall.propTypes = {
    setRef: PropTypes.objectOf(PropTypes.any),
    position: PropTypes.arrayOf(PropTypes.number),
    textureURL: PropTypes.string
};

PoolBall.defaultProps = {
    setRef: {},
    position: [],
    textureURL: ''
};

export default PoolBall;
