const globalWidgetStyle = {
    header: {
        fontColor: "000000",
        borderRadius: [25, 25, 0, 0],
        background: {
            color: "FF0000",
            format: "fill"
        },
        margin: [25, 0, 0, 0],
    },
    body: {
        fontColor: "000000",
        background: {
            color: "cccccc",
            format: "fill"
        },
        margin: [0, 0, 100, 0],
        borderRadius: [0, 0, 25, 25]
    },
    selectedOption: {
        borderColor: "000000",
        background: {
            color: "aaaaaa",
            format: "fill"
        },
    },
    correctOptionBar: {
        background: {
            colors: ["00000088", "ffffff"],
            direction: 0,
            format: "uniformGradient"
        },
    },
    incorrectOptionBar: {
        background: {
            colors: ["00000088", "ffffff"],
            direction: 0,
            format: "uniformGradient"
        },
    },
    unselectedOptionBar: {
        background: {
            colors: ["00000088", "ffffff"],
            direction: 0,
            format: "uniformGradient"
        },
    },
    selectedOptionBar: {
        background: {
            colors: ["00000088", "ffffff"],
            direction: 0,
            format: "uniformGradient"
        },
    }
};

const setupTheme = () => {
    LiveLike.applyTheme({
        widgets: {
            poll: globalWidgetStyle,
            quiz: globalWidgetStyle,
            prediction: globalWidgetStyle,
            imageSlider: globalWidgetStyle
        }
    });
};