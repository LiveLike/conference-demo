var transparentPercentage = {
    borderColor: "00000000",
    background: {
        color: "00000000",
        format: "fill"
    },
    fontColor: "00000000",
};

const globalWidgetStyle = {
    header: {
        borderColor: "003E77",
        borderWidth: 1,
        fontColor: "ffffff",
        background: {
            color: "003E77",
            format: "fill"
        },
        margin: [10, 0, 0, 0],
    },
    body: {
        borderColor: "003E77",
        borderWidth: 1,
        fontColor: "000000",
        background: {
            color: "dedede",
            format: "fill"
        },
        margin: [0, 0, 10, 0]
    },
    footer: {
        background: {
            color: "000000",
            format: "fill"
        }
    },
    selectedOption: {
        borderColor: "003E77",
        borderWidth: 1,
        background: {
            color: "ffffff",
            format: "fill"
        },
    },
    correctOptionBar: {
        borderColor: "003E77",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    incorrectOptionBar: {
        borderColor: "003E77",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    unselectedOptionBar: {
        borderColor: "003E77",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    selectedOptionBar: {
        borderColor: "ff0000",
        borderWidth: 1,
        background: {
            colors: "dedede",
            format: "fill"
        },
    },
    interactiveTrackLeft: {
        background: {
            color: "ffffff",
            format: "fill"
        },
    },
    interactiveTrackRight: {
        background: {
            color: "007AC4",
            format: "fill"
        },
    },
    sideABar: {
        background: {
            color: "003E77",
            format: "fill"
        },
        fontColor: "ffffff",
        margin: [10,0,0,0]
    },
    sideBBar: {
        background: {
            color: "575757",
            format: "fill"
        },
        fontColor: "ffffff",
        margin: [10,0,0,0]
    },
};

const setupTheme = () => {
    LiveLike.applyTheme({
        widgets: {
            poll: globalWidgetStyle,
            quiz: {
                header: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "ffffff",
                    background: {
                        color: "003E77",
                        format: "fill"
                    },
                    margin: [10, 0, 0, 0],
                },
                body: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "000000",
                    background: {
                        color: "dedede",
                        format: "fill"
                    },
                    margin: [0, 0, 10, 0]
                },
                footer: {
                    background: {
                        color: "000000",
                        format: "fill"
                    }
                },
                selectedOption: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                correctOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                incorrectOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                unselectedOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                selectedOptionBar: {
                    borderColor: "ff0000",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                interactiveTrackLeft: {
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                interactiveTrackRight: {
                    background: {
                        color: "44bbff",
                        format: "fill"
                    },
                },
                selectedOptionPercentage: transparentPercentage,
                unselectedOptionPercentage: transparentPercentage,
                correctOptionPercentage: transparentPercentage,
                incorrectOptionPercentage: transparentPercentage,
            },
            prediction: {
                header: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "ffffff",
                    background: {
                        color: "003E77",
                        format: "fill"
                    },
                    margin: [10, 0, 0, 0],
                },
                body: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "000000",
                    background: {
                        color: "dedede",
                        format: "fill"
                    },
                    margin: [0, 0, 10, 0]
                },
                footer: {
                    background: {
                        color: "000000",
                        format: "fill"
                    }
                },
                selectedOption: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                correctOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                incorrectOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                unselectedOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                selectedOptionBar: {
                    borderColor: "ff0000",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                interactiveTrackLeft: {
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                interactiveTrackRight: {
                    background: {
                        color: "44bbff",
                        format: "fill"
                    },
                },
                selectedOptionPercentage: transparentPercentage,
                unselectedOptionPercentage: transparentPercentage,
                correctOptionPercentage: transparentPercentage,
                incorrectOptionPercentage: transparentPercentage,
            },
            imageSlider: globalWidgetStyle,
            cheerMeter: globalWidgetStyle,
            alert: globalWidgetStyle,
            videoAlert: globalWidgetStyle,
            pollFollowUp: globalWidgetStyle,
            quizFollowUp: {
                header: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "ffffff",
                    background: {
                        color: "003E77",
                        format: "fill"
                    },
                    margin: [10, 0, 0, 0],
                },
                body: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "000000",
                    background: {
                        color: "dedede",
                        format: "fill"
                    },
                    margin: [0, 0, 10, 0]
                },
                footer: {
                    background: {
                        color: "000000",
                        format: "fill"
                    }
                },
                selectedOption: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                correctOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                incorrectOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                unselectedOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                selectedOptionBar: {
                    borderColor: "ff0000",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                interactiveTrackLeft: {
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                interactiveTrackRight: {
                    background: {
                        color: "44bbff",
                        format: "fill"
                    },
                },
                selectedOptionPercentage: transparentPercentage,
                unselectedOptionPercentage: transparentPercentage,
                correctOptionPercentage: transparentPercentage,
                incorrectOptionPercentage: transparentPercentage,
            },
            predictionFollowUp: {
                header: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "ffffff",
                    background: {
                        color: "003E77",
                        format: "fill"
                    },
                    margin: [10, 0, 0, 0],
                },
                body: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    fontColor: "000000",
                    background: {
                        color: "dedede",
                        format: "fill"
                    },
                    margin: [0, 0, 10, 0]
                },
                footer: {
                    background: {
                        color: "000000",
                        format: "fill"
                    }
                },
                selectedOption: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                correctOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                incorrectOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                unselectedOptionBar: {
                    borderColor: "003E77",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                selectedOptionBar: {
                    borderColor: "ff0000",
                    borderWidth: 1,
                    background: {
                        colors: "dedede",
                        format: "fill"
                    },
                },
                interactiveTrackLeft: {
                    background: {
                        color: "ffffff",
                        format: "fill"
                    },
                },
                interactiveTrackRight: {
                    background: {
                        color: "44bbff",
                        format: "fill"
                    },
                },
                selectedOptionPercentage: transparentPercentage,
                unselectedOptionPercentage: transparentPercentage,
                correctOptionPercentage: transparentPercentage,
                incorrectOptionPercentage: transparentPercentage,
            }
        }
    });
};