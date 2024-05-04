const { useState } = require("react");


export default function LineSpawner({ direction, bgColor }) {
    let min = 10;
    let max = 15;
    let lines = [];
    let maxCount = Math.floor(Math.random() * (max - min + 1) + min);

    for (let i = 0; i < maxCount; i++) {
        lines.push(
            <LineMover
                direction={direction}
                key={"linemover-" + i}
                bgColor={bgColor}
            />
        );
    }

    return lines;
}

function LineMover({ direction, bgColor }) {
    let [start, setStart] = useState(false);
    let topMax = window.innerHeight * 1.5;
    let topMin = window.innerHeight * 0;
    let top = Math.floor(Math.random() * (topMax - topMin + 1) + topMin);

    let widthMax = 600;
    let widthMin = 100;
    let width = Math.floor(Math.random() * (widthMax - widthMin + 1) + widthMin);

    let heightMax = 100;
    let heightMin = 1;
    let height = Math.floor(
        Math.random() * (heightMax - heightMin + 1) + heightMin
    );

    useEffect(() => {
        setTimeout(() => {
            setStart(true);
        });
    }, []);

    let durationMax = 35;
    let durationMin = 20;
    let duration = Math.floor(
        Math.random() * (durationMax - durationMin + 1) + durationMin
    );

    let startXMax = window.innerWidth * 2;
    let startXMin = window.innerWidth / 5;
    let startX = Math.floor(
        Math.random() * (startXMax - startXMin + 1) + startXMin
    );

    let endX = window.innerWidth * 2;
    let left = "auto";
    let right = "auto";

    if (direction == "left") {
        left = startX + "px";
        if (start) {
            left = endX;
        }
    } else if (direction == "right") {
        right = startX + "px";
        if (start) {
            right = endX;
        }
    }

    return (
        <Box
            position="absolute"
            bottom={direction == "left" ? top + "px" : "auto"}
            top={direction == "right" ? top + "px" : "auto"}
            left={left}
            right={right}
            width={width}
            height={height}
            zIndex="4"
            bgColor={bgColor ? bgColor : "#17222a"}
            transition={`left ${duration}s linear, right ${duration}s linear`}
        // transformOrigin={"center"}
        // transform={!start ? `translate(${startX}px, 0)` : "translate(2000px, 0)"}
        ></Box>
    );
}
