import colors from '../colors';

const levels = [
    {
        title: 'First level',
        background: colors.background,
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100],
            color: colors.primary
        },
        phases: [
            {
                time: 5,
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 7,
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.secondary,
            },
        ],
        goal: [[0, 0], [0, 100], [50, 100], [50, 150], [100, 150], [100, 50], [50, 50], [50, 0]],

    },
    {
        title: 'Second level',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 5,
                tool: [[50, 0], [0, 50], [100, 50]],
                center: [50, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 5,
                tool: [[50, 0], [0, 50], [100, 50]],
                center: [25, 25],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 50], [0, 150], [50, 100], [100, 150], [100, 50], [50, 0]],

    }
]

export default levels;
