function KeyLight({
    brightness,
    color,
    position
}) {
    return (< rectAreaLight width={
        50
    }
        height={
            30
        }
        color={
            color
        }
        intensity={
            brightness
        }
        position={
            position
        }
        lookAt={
            [0, 0, 0]
        }
        penumbra={
            1
        }
        castShadow />);
}

function FillLight({
    brightness,
    color
}) {
    return (< rectAreaLight width={
        3
    }
        height={
            3
        }
        intensity={
            brightness
        }
        color={
            color
        }
        position={
            [2, 1, 4]
        }
        lookAt={
            [0, 0, 0]
        }
        penumbra={
            2
        }
        castShadow />);
}

function RimLight({ brightness, color }) {
    return (
        < rectAreaLight width={2}
            height={
                2
            }
            intensity={
                brightness
            }
            color={
                color
            }
            position={
                [1, 20, -2]
            }
            rotation={
                [0, 180, 0]
            }
            castShadow />);
}



function Lights() {
    return (<>
        <KeyLight brightness={10} color="#ffbdf4" position={[0, 50, 40]} />
        <KeyLight brightness={10} color="#ffbdf4" position={[0, 50, 20]} />
        <KeyLight brightness={10} color="#ffbdf4" position={[0, 50, 60]} />
    </>
    );
}
export default Lights;