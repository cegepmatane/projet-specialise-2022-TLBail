import React, { useEffect, forwardRef, useRef, useState } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import PoolTable from './PoolTable';
import PoolBall from './PoolBall';
import { Physics, Debug, usePlane, useSphere, useCompoundBody } from '@react-three/cannon'

function PoolGame({ nfts }) {

    const { camera } = useThree();

    camera.fov = 45;
    camera.aspect = window.innerWidth / window.innerHeight;



    camera.position.set(0, 15, 30);




    return (
        <mesh>
            <React.Suspense fallback={<mesh />}>
                <PoolTable />
            </React.Suspense>
            <Physics iteration={20}>
                {/* <Debug scale={1.1} color="black"> */}
                <Plane rotation={[-Math.PI / 2, 0, 0]} />
                <Plane position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]} />
                <Plane position={[0, 0, -24]} />
                <Plane position={[0, 0, 24]} rotation={[0, Math.PI, 0]} />
                <Plane position={[11, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                <Plane position={[-11, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

                {/* </Debug> */}

                <object3D>
                    <PoolBall position={[0, 0.5, -16]} textureURL={nfts[0].img} />
                    <PoolBall position={[-1.01, 0.5, 15]} textureURL={nfts[1].img} />
                    <PoolBall position={[1.01, 0.5, 17]} textureURL={nfts[2].img} />
                    <PoolBall position={[-0.51, 0.5, 16]} textureURL={nfts[3].img} />
                    <PoolBall position={[-1.01, 0.5, 17]} textureURL={nfts[4].img} />
                    <PoolBall position={[-2.02, 0.5, 17]} textureURL={nfts[5].img} />
                    <PoolBall position={[1.53, 0.5, 16]} textureURL={nfts[6].img} />
                    <PoolBall position={[0.51, 0.5, 14]} textureURL={nfts[7].img} />
                    <PoolBall position={[0, 0.5, 15]} textureURL={nfts[8].img} />
                    <PoolBall position={[0, 0.5, 13]} textureURL={nfts[9].img} />
                    <PoolBall position={[0.51, 0.5, 16]} textureURL={nfts[10].img} />
                    <PoolBall position={[2.02, 0.5, 17]} textureURL={nfts[11].img} />
                    <PoolBall position={[-0.51, 0.5, 14]} textureURL={nfts[12].img} />
                    <PoolBall position={[0, 0.5, 17]} textureURL={nfts[13].img} />
                    <PoolBall position={[-1.53, 0.5, 16]} textureURL={nfts[14].img} />
                    <PoolBall position={[1.01, 0.5, 15]} textureURL={nfts[15].img} />
                </object3D>

            </Physics>
        </mesh>
    );
}


function Plane(props) {
    const [ref] = usePlane(() => ({ type: 'Static', ...props }))
    return (
        <mesh receiveShadow ref={ref}>
            <meshStandardMaterial color="#ffb385" />
        </mesh>
    )
}


export default PoolGame;

