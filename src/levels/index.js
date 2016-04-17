const levels = [
    {
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 5,
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
            },
            {
                time: 5,
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
            },
        ],
        goal: [[0, 0], [0, 100], [50, 100], [50, 150], [100, 150], [100, 50], [50, 50], [50, 0]],

    }
]

export default levels;
