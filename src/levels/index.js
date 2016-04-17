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
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 5,
                // square
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
                // triangle up
                tool: [[50, 0], [0, 50], [100, 50]],
                center: [50, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 5,
                // triangle up
                tool: [[50, 0], [0, 50], [100, 50]],
                center: [25, 25],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 50], [0, 150], [50, 100], [100, 150], [100, 50], [50, 0]],

    },
    {
        title: 'Third level',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 5,
                // triangle down
                tool: [[0, 0], [50, 50], [100, 0]],
                center: [50, 25],
                type: 'add',
                color: colors.highlight,
            },
            {
                time: 5,
                // square
                tool: [[0, 0], [0, 50], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 0], [0, 100], [50, 150], [100, 100], [100, 50], [50, 50], [50, 0]],

    },
    {
        title: 'Fourth level',
        initialShape: {
            points: [[0, 0], [0, 100], [100, 100], [100, 0]],
            position: [100, 100]
        },
        phases: [
            {
                time: 5,
                // half triangle down right
                tool: [[0, 0], [0, 50], [50, 0]],
                center: [25, 25],
                type: 'subtract',
                color: colors.highlight,
            },
            {
                time: 5,
                // half triangle down left
                tool: [[0, 0], [50, 50], [50, 0]],
                center: [25, 25],
                type: 'add',
                color: colors.tertiary,
            },
        ],
        goal: [[0, 50], [50, 50], [0, 100], [50, 100], [100, 150], [100, 0], [50, 0]],
        //goal: [[0, 50], [0, 100], [50, 100], [100, 150], [100, 75], [50, 75], [100, 25], [100, 0], [50, 0]],

    }
]

export default levels;
